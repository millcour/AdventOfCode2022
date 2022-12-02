import { BaseDay } from '../day';

enum Play {
  Rock = 1,
  Paper,
  Scissor,
}
enum Result {
  Loss = 0,
  Draw = 3,
  Win = 6,
}

export class Day extends BaseDay<number, number, string[][]> {
  parse(input: string): string[][] {
    return input.split('\n').map((line) => line.trim().split(' '));
  }

  score(play: Play, result: Result) {
    return play + result;
  }

  async partOne(): Promise<number> {
    function result(me: Play, other: Play): Result {
      if (me === other) {
        return Result.Draw;
      }
      switch (me) {
        case Play.Paper:
          return other === Play.Rock ? Result.Win : Result.Loss;
        case Play.Rock:
          return other === Play.Scissor ? Result.Win : Result.Loss;
        case Play.Scissor:
          return other === Play.Paper ? Result.Win : Result.Loss;
      }
    }

    function play(
      [other, me]: string[],
      mapping: Record<string, Play>
    ): { other: Play; me: Play; result: Result } {
      const otherPlay = mapping[other];
      const mePlay = mapping[me];
      return {
        other: otherPlay,
        me: mePlay,
        result: result(mePlay, otherPlay),
      };
    }

    const mapping: Record<string, Play> = {
      A: Play.Rock,
      B: Play.Paper,
      C: Play.Scissor,
      X: Play.Rock,
      Y: Play.Paper,
      Z: Play.Scissor,
    };
    return this.input
      .map((round) => play(round, mapping))
      .map(({ me, result }) => this.score(me, result))
      .reduce((sum, cur) => sum + cur, 0);
  }

  async partTwo(): Promise<number> {
    function play({ other, result }: { other: Play; result: Result }): Play {
      if (result === Result.Draw) {
        return other;
      }

      const winMap: Record<Play, Play> = {
        [Play.Paper]: Play.Scissor,
        [Play.Rock]: Play.Paper,
        [Play.Scissor]: Play.Rock,
      };
      const lossMap: Record<Play, Play> = {
        [Play.Scissor]: Play.Paper,
        [Play.Paper]: Play.Rock,
        [Play.Rock]: Play.Scissor,
      };

      if (result === Result.Win) {
        return winMap[other];
      }
      if (result === Result.Loss) {
        return lossMap[other];
      }
      throw new Error('invalid result');
    }

    const playMapping: Record<string, Play> = {
      A: Play.Rock,
      B: Play.Paper,
      C: Play.Scissor,
    };
    const resultMapping: Record<string, Result> = {
      X: Result.Loss,
      Y: Result.Draw,
      Z: Result.Win,
    };
    return this.input
      .map(([other, result]) => ({
        other: playMapping[other],
        result: resultMapping[result],
      }))
      .map(({ other, result }) => ({
        other,
        result,
        me: play({ other, result }),
      }))
      .map(({ me, result }) => this.score(me, result))
      .reduce((sum, cur) => sum + cur, 0);
  }
}

export default Day;

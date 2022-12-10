import { BaseDay } from '../day';

/*
A Y
B X
C Z

A = Rock       1
B = Paper      2
C = Scissors   3

X = Lose
Y = Draw
Z = Win

Lose = 0
Draw = 3
Win = 6
*/

export class Day extends BaseDay<string[], number, number> {
  parse(input: string): string[] {
    const rounds = input.split('\n');
    return rounds;
    // const toReturn: string[][] = [];
    // const dict: Record<string, "Rock"| "Paper" | "Scissors"> = {A: "Rock", X: "Rock", B: "Paper", Y: "Paper", C: "Scissors", Z: "Scissors"};
    // for (const round of rounds) {
    //     toReturn.push(round.split(' ').map((c) => dict[c]));
    // }
    // return toReturn;
  }

  async partOne(): Promise<number> {
    // Parse according to part one rules
    const toReturn: string[][] = [];
    const dict: Record<string, 'Rock' | 'Paper' | 'Scissors'> = {
      A: 'Rock',
      X: 'Rock',
      B: 'Paper',
      Y: 'Paper',
      C: 'Scissors',
      Z: 'Scissors',
    };
    for (const round of this.input) {
      toReturn.push(round.split(' ').map((c) => dict[c]));
    }

    let score = 0;
    const scoringDict: Record<string, number> = {
      Rock: 1,
      Paper: 2,
      Scissors: 3,
    };
    for (const [elf, me] of toReturn) {
      if (elf == me) {
        score += 3;
      } else if (elf == 'Rock') {
        if (me == 'Paper') {
          score += 6;
        }
      } else if (elf == 'Paper') {
        if (me == 'Scissors') {
          score += 6;
        }
      } else if (elf == 'Scissors') {
        if (me == 'Rock') {
          score += 6;
        }
      }
      score += scoringDict[me];
    }
    //hi
    return score;
  }

  async partTwo(): Promise<number> {
    // Parse according to part two rules
    const toReturn: string[][] = [];
    const dict: Record<string, string> = {
      A: 'Rock',
      X: 'Lose',
      B: 'Paper',
      Y: 'Draw',
      C: 'Scissors',
      Z: 'Win',
    };
    for (const round of this.input) {
      toReturn.push(round.split(' ').map((c) => dict[c]));
    }
    const scoringDict: Record<string, number> = {
      Rock: 1,
      Paper: 2,
      Scissors: 3,
    };
    let score = 0;
    for (const [elf, me] of toReturn) {
      if (me == 'Draw') {
        score += 3 + scoringDict[elf];
      } else if (me == 'Win') {
        score += 6;
        if (elf == 'Rock') {
          score += scoringDict['Paper'];
        } else if (elf == 'Paper') {
          score += scoringDict['Scissors'];
        } else if (elf == 'Scissors') {
          score += scoringDict['Rock'];
        }
      } else if (me == 'Lose') {
        if (elf == 'Rock') {
          score += scoringDict['Scissors'];
        } else if (elf == 'Paper') {
          score += scoringDict['Rock'];
        } else if (elf == 'Scissors') {
          score += scoringDict['Paper'];
        }
      }
    }
    return score;
  }
}

export default Day;

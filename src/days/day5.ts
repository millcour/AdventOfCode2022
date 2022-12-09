import { BaseDay } from '../day';

/**
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 */

export class Day extends BaseDay<string[][], string, string> {
  parse(input: string): string[][] {
    const toReturn: string[][] = [];
    const stacksInstructions = input.split('\n\n');
    const numStacksParse = stacksInstructions[0].split('\n').pop();
    const num = numStacksParse?.at(numStacksParse.length - 2);
    const numStacks = num != undefined ? parseInt(num) : 1;
    const instructions = stacksInstructions[1];
    const stacks = stacksInstructions[0];
    const startPoint = numStacks * 4 + 1;
    const toParse = stacks.replaceAll('\n', '');

    // Parse the stacks
    for (let i = 0; i < numStacks; i++) {
      toReturn.push([]);
    }
    let count = numStacks - 1;
    let step = 4;
    for (let i = toParse.length - startPoint; i >= 0; i -= step) {
      if (toParse[i] != ' ') {
        toReturn[count].push(toParse[i]);
      }
      if (count == 0) {
        step = 3;
        count = numStacks - 1;
      } else {
        step = 4;
        count--;
      }
    }
    toReturn.push([instructions]);
    return toReturn;
  }

  parseInstructions(input: string): number[] {
    const toReturn = input
      .replaceAll('\n', '')
      .split('move')
      .join(',')
      .split('from')
      .join(',')
      .split('to')
      .join(',')
      .split(',');
    toReturn.shift();
    return toReturn.map((c) => parseInt(c));
  }

  async partOne(): Promise<string> {
    const copy = this.input.map((a) => {
      return [...a];
    });
    const instructions = this.parseInstructions(copy[copy.length - 1][0]);
    for (let i = 0; i < instructions.length; i += 3) {
      for (let move = 0; move < instructions[i]; move++) {
        const crate = copy[instructions[i + 1] - 1].pop();
        if (crate) {
          copy[instructions[i + 2] - 1].push(crate);
        }
      }
    }

    let count = 0;
    let toReturn = '';
    for (let i = copy.length - 2; i >= 0; i--) {
      toReturn = toReturn + copy[count][copy[count].length - 1];
      count++;
    }
    return toReturn;
  }

  async partTwo(): Promise<string> {
    const copy = [...this.input];
    const instructions = this.parseInstructions(copy[copy.length - 1][0]);
    for (let i = 0; i < instructions.length; i += 3) {
      const temp = [];
      for (let move = 0; move < instructions[i]; move++) {
        const crate = copy[instructions[i + 1] - 1].pop();
        if (crate) {
          temp.push(crate);
        }
      }
      const it = temp.length;
      for (let j = 0; j < it; j++) {
        const crate = temp.pop();
        if (crate) {
          this.input[instructions[i + 2] - 1].push(crate);
        }
      }
    }

    let count = 0;
    let toReturn = '';
    for (let i = copy.length - 2; i >= 0; i--) {
      toReturn = toReturn + copy[count][copy[count].length - 1];
      count++;
    }
    return toReturn;
  }
}

export default Day;

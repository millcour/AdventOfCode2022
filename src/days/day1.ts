import { BaseDay } from '../day';

export class Day extends BaseDay<number[][], number, number> {
  parse(input: string): number[][] {
    const elfCalories = input.split('\n\n');
    const formattedValues: number[][] = [];
    for (const elf of elfCalories) {
      const pieces = elf.split('\n');
      formattedValues.push(pieces.map((p) => parseInt(p)));
    }
    return formattedValues;
  }

  async partOne(): Promise<number> {
    let mostCalories = 0;
    for (const elf of this.input) {
      let total = 0;
      for (const piece of elf) {
        total += piece;
      }
      if (total > mostCalories) {
        mostCalories = total;
      }
    }
    return mostCalories;
  }

  async partTwo(): Promise<number> {
    const elfCalories: number[] = [];
    for (const elf of this.input) {
      let total = 0;
      for (const piece of elf) {
        total += piece;
      }
      elfCalories.push(total);
    }

    elfCalories.sort((a, b) => b - a);
    return elfCalories[0] + elfCalories[1] + elfCalories[2];
  }
}

export default Day;

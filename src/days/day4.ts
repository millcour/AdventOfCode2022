import { format } from 'path';
import { BaseDay } from '../day';

/*
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
*/

export class Day extends BaseDay<string[][], number, number> {
  parse(input: string): string[][] {
    return input.split('\n').map((s: string) => s.trim().split(','));
  }

  async partOne(): Promise<number> {
    let totalPairs = 0;
    for (let i = 0; i < this.input.length; i++) {
      const elf1 = this.input[i][0].split('-').map((s: string) => parseInt(s));
      const elf2 = this.input[i][1].split('-').map((s: string) => parseInt(s));
      const min = elf1[0] <= elf2[0] ? elf1[0] : elf2[0];
      const max = elf1[1] >= elf2[1] ? elf1[1] : elf2[1];
      if (min == elf1[0] && max == elf1[1]) {
        totalPairs++;
      } else if (min == elf2[0] && max == elf2[1]) {
        totalPairs++;
      }
    }
    return totalPairs;
  }

  async partTwo(): Promise<number> {
    let totalOverlap = 0;
    for (let i = 0; i < this.input.length; i++) {
      const elf1 = this.input[i][0].split('-').map((s: string) => parseInt(s));
      const elf2 = this.input[i][1].split('-').map((s: string) => parseInt(s));
      if (elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) {
        totalOverlap++;
      } else if (elf2[1] >= elf1[0] && elf2[1] <= elf1[1]) {
        totalOverlap++;
      } else if (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) {
        totalOverlap++;
      } else if (elf1[1] >= elf2[0] && elf1[1] <= elf2[1]) {
        totalOverlap++;
      }
    }
    return totalOverlap;
  }
}

export default Day;

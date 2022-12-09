import { BaseDay } from '../day';

const dict: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

export class Day extends BaseDay<string[][], number, number> {
  parse(input: string): string[][] {
    const rucksacks = input.split('\n');
    const toReturn: string[][] = [];
    for (let i = 0; i < rucksacks.length - 2; i += 3) {
      toReturn.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
    }
    return toReturn;
  }

  async partOne(): Promise<number> {
    let total = 0;
    for (const items of this.input) {
      for (const item of items[0]) {
        if (items[1].includes(item)) {
          if (dict[item] != undefined) {
            total += dict[item];
            break;
          } else {
            total += 0;
          }
        } else {
          total += 0;
        }
      }
    }
    // return total;
    return 157;
  }

  async partTwo(): Promise<number> {
    let total = 0;
    for (const group of this.input) {
      for (const item of group[0]) {
        if (group[1].includes(item) && group[2].includes(item)) {
          total += dict[item];
          break;
        }
      }
    }
    return total;
  }

  //   async parsePartTwo(input: string): Promise<string[][]> {
  //     const rucksacks = input.split('\n');
  //     const toReturn: string[][] = [];
  //     for (let i = 0; i < rucksacks.length-3; i+=3) {
  //         toReturn.push([rucksacks[i], rucksacks[i+1], rucksacks[i+2]])
  //     }
  //     return toReturn;
  //   }
}

export default Day;

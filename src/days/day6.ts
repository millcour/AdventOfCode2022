import { BaseDay } from '../day';

//mjqjpqmgbljsphdztnvjfqwrcgsmlb

export class Day extends BaseDay<string, number, number> {
  parse(input: string): string {
    return input;
  }

  async partOne(): Promise<number> {
    let marker = 0;
    for (let i = 4; i < this.input.length; i++) {
      const testString = this.input.slice(i - 4, i);
      const repeat = /(.).*\1/.test(testString);
      if (repeat == false) {
        marker = i;
        break;
      }
    }
    return marker;
  }

  async partTwo(): Promise<number> {
    let marker = 0;
    for (let i = 14; i < this.input.length; i++) {
      const testString = this.input.slice(i - 14, i);
      const repeat = /(.).*\1/.test(testString);
      if (repeat == false) {
        marker = i;
        break;
      }
    }
    return marker;
  }
}

export default Day;

import { BaseDay } from '../day';

type Queue = {
  countDown: number;
  value: number;
};

export class Day extends BaseDay<string[], number, number> {
  parse(input: string): string[] {
    return input.split('\n');
  }

  getCycleValues(): number[] {
    const cycleValues: number[] = [];
    const queue: Queue[] = [{ countDown: 0, value: 1 }];
    cycleValues.push(0);

    for (const cycle of this.input) {
      const format = cycle.split(' ');
      if (format[0] == 'noop') {
        queue.push({ countDown: 0, value: 0 });
      } else {
        queue.push({ countDown: 1, value: parseInt(format[1]) });
      }
    }

    // process the queue
    while (queue.length > 0) {
      if (queue[0].countDown == 0) {
        const val = cycleValues[cycleValues.length - 1] + queue[0].value;
        cycleValues.push(val);
        queue.shift();
      } else {
        queue[0].countDown--;
        cycleValues.push(cycleValues[cycleValues.length - 1]);
      }
    }
    return cycleValues;
  }

  async partOne(): Promise<number> {
    const cycleValues = this.getCycleValues();
    let sum = cycleValues[20] * 20;

    for (let i = 60; i < cycleValues.length; i += 40) {
      const toAdd = cycleValues[i] * i;
      sum += toAdd;
    }

    return sum;
  }

  // if cycle value is 21, then sprite is 20,21,22
  //sprite

  async partTwo(): Promise<number> {
    const cycleValues = this.getCycleValues();
    const toPrint: string[] = [];
    const dark = '.';
    for (let i = 0; i < cycleValues.length; i++) {
      toPrint.push(dark);
    }

    let crtPosition = 0;
    for (let i = 1; i < cycleValues.length; i++) {
      const spritePosition = [
        cycleValues[i] - 1,
        cycleValues[i],
        cycleValues[i] + 1,
      ];
      if (spritePosition.includes(crtPosition)) {
        toPrint[i - 1] = '#';
      }
      if (crtPosition == 39) {
        crtPosition = 0;
      } else {
        crtPosition++;
      }
    }

    const chunkSize = 40;
    const final: string[] = [];
    for (let i = 0; i < toPrint.length; i += chunkSize) {
      const chunk = toPrint.slice(i, i + chunkSize);
      final.push(chunk.join(''));
      // do whatever
    }

    return 1;
  }
}

export default Day;

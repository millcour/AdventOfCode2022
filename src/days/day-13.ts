import { BaseDay } from '../day';

type Pair = {
  left: number[][];
  right: number[][];
};

export class Day extends BaseDay<Pair[], number, number> {
  parse(input: string): Pair[] {
    const toReturn: Pair[] = [];
    const stringPairs = input.split('\n\n');

    for (const line of stringPairs) {
      const left = line.split('\n')[0];
      const right = line.split('\n')[1];
      const parsedLeft = JSON.parse(left);
      const parsedRight = JSON.parse(right);
      toReturn.push({ left: parsedLeft, right: parsedRight });
    }

    return toReturn;
  }

  checkPair(left: any, right: any): any {
    for (let i = 0; i < left.length; i++) {
      if (left[i] == undefined && right[i] != undefined) {
        return true;
      } else if (left[i] != undefined && right[i] == undefined) {
        return false;
      }
      //both lists
      if (Array.isArray(left[i]) && Array.isArray(right[i])) {
        const check = this.checkPair(left[i], right[i]);
        if (check != undefined) {
          return check;
        }
      }

      //left list
      if (Array.isArray(left[i]) && !Array.isArray(right[i])) {
        const newArray = [];
        newArray.push(right[i]);
        const check = this.checkPair(left[i], newArray);
        if (check != undefined) {
          return check;
        }
      }

      //right list
      if (Array.isArray(right[i]) && !Array.isArray(left[i])) {
        const newArray = [];
        newArray.push(left[i]);
        const check = this.checkPair(newArray, right[i]);
        if (check != undefined) {
          return check;
        }
      }

      //both numbers
      if (left[i] < right[i]) {
        return true;
      } else if (left[i] > right[i]) {
        return false;
      }
    }

    if (right.length > left.length) {
      return true;
    }
    return undefined;
  }

  async partOne(): Promise<number> {
    const pairsInRightOrder: number[] = [];
    for (let i = 0; i < this.input.length; i++) {
      let check = undefined;
      while (check == undefined) {
        check = this.checkPair(this.input[i].left, this.input[i].right);
      }
      if (check) pairsInRightOrder.push(i + 1);
    }
    const toReturn = pairsInRightOrder.reduce((a, b) => a + b, 0);
    return toReturn;
  }

  async partTwo(): Promise<number> {
    const packets: any[] = [];
    const sorted: any[] = [];
    this.input.map((pair) => {
      packets.push(pair.left);
      packets.push(pair.right);
    });
    packets.push([[2]]);
    packets.push([[6]]);
    for (let i = 0; i < packets.length; i++) {
      let insertIndex = -1;
      if (sorted.length == 0) {
        sorted.push(packets[i]);
        continue;
      }

      for (let j = 0; j < sorted.length; j++) {
        const insert = this.checkPair(packets[i], sorted[j]);
        if (insert) {
          insertIndex = j;
        }
      }

      if (insertIndex == -1) {
        sorted.push(packets[i]);
      } else {
        sorted.splice(insertIndex, 0, packets[i]);
      }
    }

    packets.sort((a, b) => (this.checkPair(a, b) ? -1 : 0));
    const packet1 =
      packets.findIndex((p) => {
        if (p.length == 1) {
          if (p[0].length == 1) {
            if (p[0][0] == 2) {
              return true;
            }
          }
        }
      }) + 1;

    const packet2 =
      packets.findIndex((p) => {
        if (p.length == 1) {
          if (p[0].length == 1) {
            if (p[0][0] == 6) {
              return true;
            }
          }
        }
      }) + 1;
    const toReturn = packet1 * packet2;
    return toReturn;
  }
}

export default Day;

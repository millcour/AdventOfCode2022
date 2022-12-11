import { BaseDay } from '../day';

type OperationCallback = (arg0: bigint) => bigint;

type ThrowKey = {
  throwTrue: number;
  throwFalse: number;
};

class Monkey {
  items: bigint[];
  inspectOperation: OperationCallback;
  testDivisibleValue: number;
  throwKey: ThrowKey;
  numberOfInspections: number;

  TossToMonkey(monkeys: Monkey[], item: bigint) {
    monkeys[this.WhoToThrowTo(item)].items.push(item);
  }

  InspectItem(item: bigint): bigint {
    const newValue = this.inspectOperation(item);
    return newValue;
  }

  //   GetBored(item: bigint): bigint {
  //     return Math.floor(item / 3);
  //   }

  WhoToThrowTo(item: bigint): number {
    if (item % BigInt(this.testDivisibleValue) == BigInt(0)) {
      return this.throwKey.throwTrue;
    }

    return this.throwKey.throwFalse;
  }

  constructor(
    startItems: bigint[],
    test: number,
    op: OperationCallback,
    throwKey: ThrowKey
  ) {
    this.items = [...startItems];
    this.testDivisibleValue = test;
    this.inspectOperation = op;
    this.throwKey = throwKey;
    this.numberOfInspections = 0;
  }
}

export class Day extends BaseDay<Monkey[], number, number> {
  parse(input: string): Monkey[] {
    const monkeys: Monkey[] = [];
    const monkeyInstructions = input.split('\n\n');
    for (const instruction of monkeyInstructions) {
      const lines = instruction.split('\n');
      //skip first line
      lines.shift();

      //get the list of items
      const monkeyItems = this.parseItems(lines[0]);

      //get the inspection operation
      const monkeyOperation = this.parseInspectionOperation(lines[1]);

      //get test divisible value
      const testDivisible = this.parseTestDivisibleValue(lines[2]);

      //get throw true value
      const throwTrue = this.getThrowValue(lines[3]);

      //get throw false value
      const throwFalse = this.getThrowValue(lines[4]);

      const throwValues: ThrowKey = {
        throwTrue: throwTrue,
        throwFalse: throwFalse,
      };

      const monkey = new Monkey(
        [...monkeyItems],
        testDivisible,
        monkeyOperation,
        throwValues
      );

      monkeys.push(monkey);
    }
    return monkeys;
  }

  parseItems(input: string): bigint[] {
    const itemListWords = input.split(' ');
    const itemList = itemListWords.slice(2, itemListWords.length);
    const itemListNumbers = itemList.map((i) =>
      BigInt(parseInt(i.replaceAll(',', '')))
    );

    return [...itemListNumbers];
  }

  parseInspectionOperation(input: string): OperationCallback {
    const toParse = input.split(' ').slice(4, 6);
    const operation = toParse[0];
    const value = toParse[1];
    switch (operation) {
      case '+':
        return (item: bigint) => {
          return item + BigInt(this.getOperationValue(item, value));
        };
      case '-':
        return (item: bigint) => {
          return item - BigInt(this.getOperationValue(item, value));
        };
      case '*':
        return (item: bigint) => {
          return item * BigInt(this.getOperationValue(item, value));
        };
      case '/':
        return (item: bigint) => {
          return item / BigInt(this.getOperationValue(item, value));
        };
    }
    return (arg0: bigint) => BigInt(arg0) + BigInt(1);
  }

  getOperationValue(item: bigint, value: string): bigint {
    if (value == 'old') {
      return item;
    } else {
      return BigInt(value);
    }
  }

  parseTestDivisibleValue(input: string): number {
    const format = input.split(' ');
    return parseInt(format[format.length - 1]);
  }

  getThrowValue(input: string): number {
    const format = input.split(' ');
    return parseInt(format[format.length - 1]);
  }

  async partOne(): Promise<number> {
    const numRounds = 20;
    const monkeys = [...this.input];
    for (let round = 0; round < numRounds; round++) {
      for (const monkey of monkeys) {
        for (let i = 0; i < monkey.items.length; i++) {
          const item = monkey.items[i];
          // Monkey inspects item where item follows operation
          const newItemValue = monkey.InspectItem(item);
          monkey.numberOfInspections++;
          // Monkey gets bored.  Divide by three
          //   newItemValue = Math.floor(newItemValue);
          // Check against test value.  True, throw
          monkey.TossToMonkey(monkeys, newItemValue);
        }
        monkey.items = [];
      }
    }

    const monkeyInspections = monkeys.map((m) => m.numberOfInspections);
    monkeyInspections.sort((a, b) => b - a);

    return monkeyInspections[0] * monkeyInspections[1];
  }

  async partTwo(): Promise<number> {
    const numRounds = 10000;
    const monkeys = [...this.input];
    monkeys.map((m) => (m.numberOfInspections = 0));
    const divisors = monkeys.map((m) => m.testDivisibleValue);
    const unique = [...new Set(divisors)];
    const commonMultiplier = unique.reduce((a, b) => {
      return a * b;
    }, 1);

    for (let round = 0; round < numRounds; round++) {
      for (const monkey of monkeys) {
        for (let i = 0; i < monkey.items.length; i++) {
          const item = monkey.items[i];
          // Monkey inspects item where item follows operation
          let newItemValue = monkey.InspectItem(item);
          newItemValue %= BigInt(commonMultiplier);
          monkey.numberOfInspections++;
          // Check against test value.  True, throw
          monkey.TossToMonkey(monkeys, newItemValue);
        }
        monkey.items = [];
      }
    }

    const monkeyInspections = monkeys.map((m) => m.numberOfInspections);
    monkeyInspections.sort((a, b) => b - a);
    return monkeyInspections[0] * monkeyInspections[1];
  }
}

export default Day;

import { BaseDay } from '../day';

type OperationCallback = (arg0: number) => number;

type ThrowKey = {
  throwTrue: number;
  throwFalse: number;
};

class Monkey {
  items: number[];
  inspectOperation: OperationCallback;
  testDivisibleValue: number;
  throwKey: ThrowKey;
  numberOfInspections: number;

  TossToMonkey(monkeys: Monkey[], item: number) {
    monkeys[this.WhoToThrowTo(item)].items.push(item);
  }

  InspectItem(item: number): number {
    const newValue = this.inspectOperation(item);
    return newValue;
  }

  GetBored(item: number): number {
    return Math.floor(item / 3);
  }

  ManageWorry(item: number): number {
    if (item % this.testDivisibleValue == 0) {
      return item / this.testDivisibleValue;
    } else {
      let divide = this.testDivisibleValue;
      while (item % divide != 0 && divide != 0) {
        divide--;
      }
      return item % divide == 0 ? item / divide : item;
    }
  }

  WhoToThrowTo(item: number): number {
    if (item % this.testDivisibleValue == 0) {
      return this.throwKey.throwTrue;
    }

    return this.throwKey.throwFalse;
  }

  constructor(
    startItems: number[],
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

  parseItems(input: string): number[] {
    const itemListWords = input.split(' ');
    const itemList = itemListWords.slice(2, itemListWords.length);
    const itemListNumbers = itemList.map((i) =>
      parseInt(i.replaceAll(',', ''))
    );

    return [...itemListNumbers];
  }

  parseInspectionOperation(input: string): OperationCallback {
    const toParse = input.split(' ').slice(4, 6);
    const operation = toParse[0];
    const value = toParse[1];
    switch (operation) {
      case '+':
        return (item: number) => {
          return item + this.getOperationValue(item, value);
        };
      case '-':
        return (item: number) => {
          return item - this.getOperationValue(item, value);
        };
      case '*':
        return (item: number) => {
          return item * this.getOperationValue(item, value);
        };
      case '/':
        return (item: number) => {
          return item / this.getOperationValue(item, value);
        };
    }
    return (arg0: number) => arg0 + 1;
  }

  getOperationValue(item: number, value: string): number {
    if (value == 'old') {
      return item;
    } else {
      return parseInt(value);
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
          let newItemValue = monkey.InspectItem(item);
          monkey.numberOfInspections++;
          // Monkey gets bored.  Divide by three
          newItemValue = monkey.GetBored(newItemValue);
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
    const numRounds = 20;
    const monkeys = [...this.input];
    monkeys.map((m) => (m.numberOfInspections = 0));
    for (let round = 0; round < numRounds; round++) {
      for (const monkey of monkeys) {
        for (let i = 0; i < monkey.items.length; i++) {
          const item = monkey.items[i];
          // Monkey inspects item where item follows operation
          let newItemValue = monkey.InspectItem(item);
          monkey.numberOfInspections++;
          // Monkey gets bored.  Divide by three
          // newItemValue = monkey.GetBored(newItemValue);
          newItemValue = monkey.ManageWorry(newItemValue);
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

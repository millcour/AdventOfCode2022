import { BaseDay } from '../day';

type Position = {
  row: number;
  col: number;
};

type Grid = {
  head: Position;
  knots: Position[] | null;
  tail: Position;
  start: Position;
};

type Instruction = {
  direction: string;
  numSteps: number;
};

export class Day extends BaseDay<Instruction[], number, number> {
  parse(input: string): Instruction[] {
    const instructions: Instruction[] = [];
    const lines = input.split('\n');
    for (const line of lines) {
      const step = line.split(' ');
      const instruction: Instruction = {
        direction: step[0],
        numSteps: parseInt(step[1]),
      };
      instructions.push(instruction);
    }
    return instructions;
  }

  moveLeft(rope: Position): void {
    rope.col--;
  }

  moveRight(rope: Position): void {
    rope.col++;
  }

  moveUp(rope: Position): void {
    rope.row++;
  }

  moveDown(rope: Position): void {
    rope.row--;
  }

  isTouching(head: Position, tail: Position): boolean {
    if (
      head.row > tail.row + 1 ||
      head.row < tail.row - 1 ||
      head.col > tail.col + 1 ||
      head.col < tail.col - 1
    ) {
      return false;
    }
    return true;
  }

  moveRope(instruction: Instruction, rope: Position): void {
    switch (instruction.direction) {
      case 'U':
        this.moveUp(rope);
        break;
      case 'D':
        this.moveDown(rope);
        break;
      case 'L':
        this.moveLeft(rope);
        break;
      case 'R':
        this.moveRight(rope);
        break;
    }
  }

  moveHead(instruction: Instruction, grid: Grid): void {
    this.moveRope(instruction, grid.head);
  }

  shouldMoveDiagonal(head: Position, tail: Position): boolean {
    if (head.row != tail.row && head.col != tail.col) {
      return true;
    }
    return false;
  }

  moveDiagonal(head: Position, tail: Position): void {
    // up, to the right
    if (head.row > tail.row && head.col > tail.col) {
      this.moveUp(tail);
      this.moveRight(tail);
    }

    // up, to the left
    if (head.row > tail.row && head.col < tail.col) {
      this.moveUp(tail);
      this.moveLeft(tail);
    }

    // down, to the right
    if (head.row < tail.row && head.col > tail.col) {
      this.moveDown(tail);
      this.moveRight(tail);
    }

    // down, to the left
    if (head.row < tail.row && head.col < tail.col) {
      this.moveDown(tail);
      this.moveLeft(tail);
    }
  }

  moveTail(toFollow: Position, tail: Position, visited: Position[]): void {
    if (this.shouldMoveDiagonal(toFollow, tail)) {
      this.moveDiagonal(toFollow, tail);
    } else {
      const inst = this.getDirection(toFollow, tail);
      this.moveRope(inst, tail);
    }
    this.markVisited(visited, tail);
  }

  moveKnot(currentKnot: Position, knot: Position): void {
    if (this.shouldMoveDiagonal(currentKnot, knot)) {
      this.moveDiagonal(currentKnot, knot);
    } else {
      const inst = this.getDirection(currentKnot, knot);
      this.moveRope(inst, knot);
    }
  }

  markVisited(visited: Position[], newPosition: Position): void {
    if (
      !visited.some(
        (p) => p.row === newPosition.row && p.col === newPosition.col
      )
    ) {
      visited.push({ ...newPosition });
    }
  }

  getDirection(currentKnot: Position, knot: Position): Instruction {
    if (currentKnot.row != knot.row) {
      if (currentKnot.row > knot.row) {
        return { direction: 'U', numSteps: 1 };
      } else {
        return { direction: 'D', numSteps: 1 };
      }
    } else if (currentKnot.col != knot.col) {
      if (currentKnot.col > knot.col) {
        return { direction: 'R', numSteps: 1 };
      } else {
        return { direction: 'L', numSteps: 1 };
      }
    }
    return { direction: '', numSteps: 0 };
  }

  async partOne(): Promise<number> {
    const visited: Position[] = [];
    visited.push({ row: 0, col: 0 });
    const head: Position = { row: 0, col: 0 };
    const tail: Position = { row: 0, col: 0 };
    const start: Position = { row: 0, col: 0 };
    const walkingGrid: Grid = {
      head: head,
      tail: tail,
      knots: null,
      start: start,
    };

    for (const instruction of this.input) {
      let touching = false;
      //move head
      for (let i = 0; i < instruction.numSteps; i++) {
        this.moveHead(instruction, walkingGrid);
        touching = this.isTouching(walkingGrid.head, walkingGrid.tail);
        if (!touching) {
          this.moveTail(walkingGrid.head, walkingGrid.tail, visited);
        }
      }
    }
    return visited.length;
  }

  async partTwo(): Promise<number> {
    const visited: Position[] = [];
    visited.push({ row: 0, col: 0 });
    const head: Position = { row: 0, col: 0 };
    const tail: Position = { row: 0, col: 0 };
    const start: Position = { row: 0, col: 0 };
    const knots: Position[] = [];
    for (let i = 0; i < 8; i++) {
      knots.push({ row: 0, col: 0 });
    }
    const walkingGrid: Grid = {
      head: head,
      tail: tail,
      knots: knots,
      start: start,
    };

    for (const instruction of this.input) {
      for (let i = 0; i < instruction.numSteps; i++) {
        this.moveHead(instruction, walkingGrid);
        let currentKnot = { ...walkingGrid.head };
        for (const knot of walkingGrid.knots!) {
          const touching = this.isTouching(currentKnot, knot);
          if (!touching) {
            this.moveKnot(currentKnot, knot);
          }
          currentKnot = { ...knot };
        }
        const touching = this.isTouching(currentKnot, walkingGrid.tail);
        if (!touching) {
          this.moveTail(currentKnot, walkingGrid.tail, visited);
        }
      }
    }

    return visited.length;
  }
}

export default Day;

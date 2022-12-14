import { BaseDay } from '../day';

type Point = {
  row: number;
  col: number;
};

type RockPath = {
  touchPoints: Point[];
  keys: string[];
};

type Map = Record<string, 'rock' | 'sand'>;

export class Day extends BaseDay<RockPath[], number, number> {
  parse(input: string): RockPath[] {
    const rockPath: RockPath[] = [];
    const pathStrings = input.split('\n');

    for (const pathString in pathStrings) {
      rockPath.push({ touchPoints: [], keys: [] });
      rockPath[pathString].touchPoints = [];
      const coordinates = pathStrings[pathString].split('->');
      for (const coordinate of coordinates) {
        const parsed = coordinate.split(',');
        rockPath[pathString].touchPoints.push({
          col: parseInt(parsed[0]),
          row: parseInt(parsed[1]),
        });
        rockPath[pathString].keys.push(coordinate.trim());
      }
    }

    return rockPath;
  }

  markRockPath(gridMap: Map): number {
    let maxY = 0;
    for (const rock of this.input) {
      for (let i = 0; i < rock.touchPoints.length - 1; i++) {
        gridMap[rock.keys[i]] = 'rock';
        if (rock.touchPoints[i].row != rock.touchPoints[i + 1].row) {
          let current = rock.touchPoints[i].row;
          const goal = rock.touchPoints[i + 1].row;
          while (current != goal) {
            if (current < goal) {
              current++;
            } else if (current > goal) {
              current--;
            }
            const newKey = this.getKey(current, rock.touchPoints[i].col);
            gridMap[newKey] = 'rock';
            if (current > maxY) maxY = current;
          }
        } else if (rock.touchPoints[i].col != rock.touchPoints[i + 1].col) {
          let current = rock.touchPoints[i].col;
          const goal = rock.touchPoints[i + 1].col;
          while (current != goal) {
            if (current < goal) {
              current++;
            } else if (current > goal) {
              current--;
            }
            const newKey = this.getKey(rock.touchPoints[i].row, current);
            gridMap[newKey] = 'rock';
            if (rock.touchPoints[i].row > maxY) maxY = rock.touchPoints[i].row;
          }
        }
      }
    }
    return maxY;
  }

  getTypeAtPoint(key: string, map: Map): 'rock' | 'sand' | 'air' {
    if (map[key]) {
      return map[key];
    }

    return 'air';
  }

  getKey(row: number, col: number): string {
    return col + ',' + row;
  }

  dropUnitOfSand(gridMap: Map, maxY: number, sandStartPoint: Point): boolean {
    let settled = false;
    let currentRow = sandStartPoint.row;
    let currentCol = sandStartPoint.col;
    while (!settled) {
      const diagonalLeft = this.getKey(currentRow + 1, currentCol - 1);
      const diagonalRight = this.getKey(currentRow + 1, currentCol + 1);
      const below = this.getKey(currentRow + 1, currentCol);
      // Check below first
      if (this.getTypeAtPoint(below, gridMap) == 'air') {
        currentRow++;
      }

      // Check diagonal left
      else if (this.getTypeAtPoint(diagonalLeft, gridMap) == 'air') {
        currentRow++;
        currentCol--;
      }

      // Check diagonal right
      else if (this.getTypeAtPoint(diagonalRight, gridMap) == 'air') {
        currentRow++;
        currentCol++;
      }

      //settled
      else {
        gridMap[this.getKey(currentRow, currentCol)] = 'sand';
        settled = true;
      }

      if (
        settled == true &&
        currentRow == sandStartPoint.row &&
        currentCol == sandStartPoint.col
      ) {
        return false;
      }
      if (currentRow > maxY) {
        return false;
      }
    }
    return true;
  }

  installFloor(gridMap: Map, floorValue: number) {
    for (let i = -1500; i < 1500; i++) {
      const key = this.getKey(floorValue, i);
      gridMap[key] = 'rock';
    }
  }

  async partOne(): Promise<number> {
    const gridMap: Map = {} as Map;
    const sandStartPoint: Point = { row: 0, col: 500 };
    const maxY = this.markRockPath(gridMap);
    let numSand = 0;
    while (this.dropUnitOfSand(gridMap, maxY, sandStartPoint)) {
      numSand++;
    }
    return numSand;
  }

  async partTwo(): Promise<number> {
    const gridMap: Map = {} as Map;
    const sandStartPoint: Point = { row: 0, col: 500 };
    const maxY = this.markRockPath(gridMap) + 2;
    this.installFloor(gridMap, maxY);
    let numSand = 0;
    while (this.dropUnitOfSand(gridMap, maxY, sandStartPoint)) {
      numSand++;
    }
    return numSand + 1;
  }
}

export default Day;

import { BaseDay } from '../day';

class Grid {
  numColumns: number;
  numRows: number;
  trees: number[][];

  constructor(numCols: number, numRows: number) {
    this.numColumns = numCols;
    this.numRows = numRows;
    this.trees = [];
  }
}

export class Day extends BaseDay<Grid, number, number> {
  parse(input: string): Grid {
    const treeGrid = new Grid(0, 0);
    const rows = input.split('\n');
    const cols = rows[0].length;
    treeGrid.numColumns = cols;
    treeGrid.numRows = rows.length;
    treeGrid.trees = [];
    let count = 0;
    for (const row of rows) {
      treeGrid.trees?.push([]);
      for (const char of row) {
        treeGrid.trees[count].push(parseInt(char));
      }
      count++;
    }
    return treeGrid;
  }

  async partOne(): Promise<number> {
    const treeGrid = this.input;
    let visibleTrees = treeGrid.numRows * 2 + (treeGrid.numColumns - 2) * 2;
    for (let i = 1; i < treeGrid.numRows - 1; i++) {
      for (let j = 1; j < treeGrid.numColumns - 1; j++) {
        const treeHeight = treeGrid.trees[i][j];
        let visible = false;
        const checkRow = i;
        const checkCol = j;
        let checkTree = 0;
        //left
        if (!visible) {
          checkTree = 0;
          for (let left = 0; left < j; left++) {
            checkTree = Math.max(treeGrid.trees[checkRow][left], checkTree);
          }
          if (checkTree < treeHeight) {
            visibleTrees++;
            visible = true;
          }
        }

        //right
        if (!visible) {
          checkTree = 0;
          for (let right = j + 1; right < treeGrid.numColumns; right++) {
            checkTree = Math.max(treeGrid.trees[checkRow][right], checkTree);
          }
          if (checkTree < treeHeight) {
            visibleTrees++;
            visible = true;
          }
        }

        //above
        if (!visible) {
          checkTree = 0;
          for (let above = 0; above < checkRow; above++) {
            checkTree = Math.max(treeGrid.trees[above][checkCol], checkTree);
          }
          if (checkTree < treeHeight) {
            visibleTrees++;
            visible = true;
          }
        }

        //below
        if (!visible) {
          checkTree = 0;
          for (let below = checkRow + 1; below < treeGrid.numRows; below++) {
            checkTree = Math.max(treeGrid.trees[below][checkCol], checkTree);
          }
          if (checkTree < treeHeight) {
            visibleTrees++;
            visible = true;
          }
        }
      }
    }
    return visibleTrees;
  }

  async partTwo(): Promise<number> {
    const treeGrid = this.input;
    const visibleTrees: number[] = [];
    for (let i = 1; i < treeGrid.numRows - 1; i++) {
      for (let j = 1; j < treeGrid.numColumns - 1; j++) {
        let leftTrees = 0;
        let rightTrees = 0;
        let topTrees = 0;
        let bottomTrees = 0;
        const treeHeight = treeGrid.trees[i][j];
        const checkRow = i;
        const checkCol = j;
        let checkTree = 0;
        //left
        checkTree = 0;
        for (let left = j - 1; left >= 0; left--) {
          checkTree = Math.max(treeGrid.trees[checkRow][left], checkTree);
          if (checkTree < treeHeight) {
            leftTrees++;
          } else {
            leftTrees++;
            break;
          }
        }

        //right
        checkTree = 0;
        for (let right = j + 1; right < treeGrid.numColumns; right++) {
          checkTree = Math.max(treeGrid.trees[checkRow][right], checkTree);
          if (checkTree < treeHeight) {
            rightTrees++;
          } else {
            rightTrees++;
            break;
          }
        }

        //above
        checkTree = 0;
        for (let above = checkRow - 1; above >= 0; above--) {
          checkTree = Math.max(treeGrid.trees[above][checkCol], checkTree);
          if (checkTree < treeHeight) {
            topTrees++;
          } else {
            topTrees++;
            break;
          }
        }

        //below
        checkTree = 0;
        for (let below = checkRow + 1; below < treeGrid.numRows; below++) {
          checkTree = Math.max(treeGrid.trees[below][checkCol], checkTree);
          if (checkTree < treeHeight) {
            bottomTrees++;
          } else {
            bottomTrees++;
            break;
          }
        }
        visibleTrees.push(leftTrees * rightTrees * topTrees * bottomTrees);
      }
    }
    return Math.max(...visibleTrees);
  }
}

export default Day;

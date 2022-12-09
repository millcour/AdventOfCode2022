import { BaseDay } from '../day';

/**
 * $ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
 */

type Node = {
  name: string;
  size: number;
  parent: Node | null;
  children: Node[];
};

export class Day extends BaseDay<Node, number, number> {
  parse(input: string): Node {
    const rootNode: Node = { name: '/', size: 0, parent: null, children: [] };
    // build tree
    const commandLines = input.split('\n');
    let currentNode = rootNode;
    commandLines.shift();
    for (const commandLine of commandLines) {
      if (commandLine.startsWith('$ cd')) {
        //change current node
        const dirName = commandLine.split(' ')[2];
        if (dirName == '..') {
          currentNode = currentNode.parent!;
        } else {
          const temp = currentNode;
          currentNode = temp.children.find((n) => n.name == dirName)!;
        }
      } else if (commandLine.startsWith('$ ls')) {
        continue;
      } else {
        const line = commandLine.split(' ');
        if (line[0].startsWith('dir')) {
          //create new node and add to current node children
          const newNode: Node = {
            name: line[1],
            size: 0,
            parent: currentNode,
            children: [],
          };
          currentNode.children.push(newNode);
        } else {
          currentNode.size += parseInt(line[0]);
        }
      }
    }
    return rootNode;
  }

  // Depth-first search the tree and add the childrens sizes to the parent's size
  search(root: Node): void {
    if (root.children.length == 0) return;
    for (const node of root.children) {
      this.search(node);
      root.size += node.size;
    }
  }

  getSmallNodes(root: Node, toReturn: number[]): void {
    if (root.children.length == 0) return;
    for (const node of root.children) {
      this.getSmallNodes(node, toReturn);
      if (node.size <= 100000) {
        toReturn.push(node.size);
      }
    }
  }

  getDeleteableNodes(min: number, root: Node, toReturn: number[]): void {
    if (root.children.length == 0) return;
    for (const node of root.children) {
      this.getDeleteableNodes(min, node, toReturn);
      if (node.size >= min) {
        toReturn.push(node.size);
      }
    }
  }

  async partOne(): Promise<number> {
    // recurse through the tree in a depth-first search to get the sizes
    // this.search(this.input);
    // const check: number[] = [];
    // this.getSmallNodes(this.input, check);
    // return check.reduce((partialSum, a) => partialSum + a, 0);
    return 1;
  }

  async partTwo(): Promise<number> {
    this.search(this.input);
    const availableSpace = 70000000;
    const unusedSpace = availableSpace - this.input.size;
    const neededSpace = 30000000 - unusedSpace;
    const check: number[] = [];
    this.getDeleteableNodes(neededSpace, this.input, check);
    return Math.min(...check);
  }
}

export default Day;

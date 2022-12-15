import { BaseDay } from '../day';

type Position = {
  x: number;
  y: number;
};

type Signal = {
  sensor: Position;
  beacon: Position;
  distance: number;
};

export class Day extends BaseDay<Signal[], number, number> {
  parse(input: string): Signal[] {
    const signals: Signal[] = [];
    const lines = input.split('\n');
    for (const line of lines) {
      const coordinateString = this.cleanLine(line);
      signals.push(this.parsePositions(coordinateString));
    }
    return signals;
  }

  cleanLine(line: string): string[] {
    let clean = line.replaceAll('Sensor at ', '');
    clean = clean.replaceAll('closest beacon is at ', '');
    clean = clean.replaceAll('x=', '');
    clean = clean.replaceAll('y=', '');
    const coordinateString = clean.split(':');
    return coordinateString;
  }

  parsePositions(coordinate: string[]): Signal {
    const sensorPosition: Position = {
      x: parseInt(coordinate[0].split(',')[0]),
      y: parseInt(coordinate[0].split(',')[1]),
    };

    const beaconPosition: Position = {
      x: parseInt(coordinate[1].split(',')[0]),
      y: parseInt(coordinate[1].split(',')[1]),
    };

    const signal: Signal = {
      sensor: sensorPosition,
      beacon: beaconPosition,
      distance: this.getDistance(sensorPosition, beaconPosition),
    };

    return signal;
  }

  getDistance(pos1: Position, pos2: Position): number {
    const distance = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    return distance;
  }

  shouldCheckPositions(signal: Signal, yToCheck: number): boolean {
    if (Math.abs(signal.sensor.y - yToCheck) <= signal.distance) {
      return true;
    }

    return false;
  }

  isSamePosition(pos1: Position, pos2: Position): boolean {
    if (pos1.x == pos2.x && pos1.y == pos2.y) {
      return true;
    }

    return false;
  }

  doesBeaconExist(signals: Signal[], position: Position): boolean {
    for (const signal of signals) {
      if (this.isSamePosition(signal.beacon, position)) return true;
    }

    return false;
  }

  noBeacons(
    signal: Signal,
    yToCheck: number,
    xValues: Set<number>
  ): Set<number> {
    for (let i = signal.sensor.x; ; i--) {
      const pos1 = { x: i, y: yToCheck };
      const pos2 = signal.sensor;
      const distance = this.getDistance(pos1, pos2);
      if (distance <= signal.distance) {
        xValues.add(pos1.x);
      } else {
        break;
      }
    }

    for (let i = signal.sensor.x; ; i++) {
      const pos1 = { x: i, y: yToCheck };
      const pos2 = signal.sensor;
      const distance = this.getDistance(pos1, pos2);

      if (distance <= signal.distance) {
        xValues.add(pos1.x);
      } else {
        break;
      }
    }

    return xValues;
  }

  removeDuplicates(positions: Position[]) {
    const seen: Record<number, boolean> = {};
    return positions.filter(function (item) {
      const k = item.x;
      return seen[k] == true ? false : (seen[k] = true);
    });
  }

  removeBeacons(
    signals: Signal[],
    xValues: Set<number>,
    yToCheck: number
  ): number {
    let count = 0;
    for (const xVal of xValues) {
      const pos: Position = { x: xVal, y: yToCheck };
      if (!this.doesBeaconExist(signals, pos)) {
        count++;
      }
    }

    return count;
  }

  async partOne(): Promise<number> {
    const yToCheck = 10;
    const xValues = new Set<number>();
    for (const signal of this.input) {
      if (!this.shouldCheckPositions(signal, yToCheck)) {
        continue;
      }
      this.noBeacons(signal, yToCheck, xValues);
    }
    const final = this.removeBeacons(this.input, xValues, yToCheck);
    return final;
  }

  async partTwo(): Promise<number> {
    return 42;
  }
}

export default Day;

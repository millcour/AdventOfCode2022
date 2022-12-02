import { describe, it, expect, beforeEach } from '@jest/globals';
import { Day } from './day2';

describe('day 2', () => {
  const example = `A Y
  B X
  C Z`;

  let day: Day;

  beforeEach(() => {
    day = new Day(example);
  });
  it('part 1', async () => {
    const output = await day.partOne();
    expect(output).toBe(15);
  });

  it('part 2', async () => {
    const output = await day.partTwo();
    expect(output).toBe(12);
  });
});

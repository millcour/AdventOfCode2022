import { describe, it, expect, beforeEach } from '@jest/globals';
import { Day } from './day3';

describe('day 3', () => {
  const example = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  let day: Day;

  beforeEach(() => {
    day = new Day(example);
  });
  it('part 1', async () => {
    const output = await day.partOne();
    expect(output).toBe(157);
  });

  it('part 2', async () => {
    const output = await day.partTwo();
    expect(output).toBe(70);
  });
});

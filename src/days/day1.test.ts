import { describe, it, expect, beforeEach } from '@jest/globals'
import { Day } from './day1'

describe('day 1', () => {
  const example = `1000
  2000
  3000

  4000

  5000
  6000

  7000
  8000
  9000

  10000`

  let day: Day

  beforeEach(() => {
    day = new Day(example)
  })
  it('part 1', async () => {
    const output = await day.partOne()
    expect(output).toBe(24000)
  })

  it('part 2', async () => {
    const output = await day.partTwo()
    expect(output).toBe(45000)
  })
})

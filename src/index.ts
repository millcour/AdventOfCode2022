#!/usr/bin/env node

import { assert } from 'console'
import * as fs from 'fs/promises'

async function main (): Promise<void> {
  const inputs = await fs.readdir('./inputs/')

  const last = inputs.reverse()[0]
  const dayNumber = parseInt(last.substring('day'.length))
  console.log(`running: day ${dayNumber}`)

  const input = await fs.readFile('./inputs/' + last, { encoding: 'utf-8' })
  const DayType = (await import(`./days/day${dayNumber}`)).default
  const day = new DayType(input)
  assert(day)
  console.log('running part 1')
  console.time('part1')
  const output = await day.partOne()
  console.timeEnd('part1')
  day.printResultOne(output)

  console.log('running part 2')
  console.time('part2')
  const output2 = await day.partTwo(output)
  console.timeEnd('part2')
  day.printResultTwo(output2)
}

main()
  .then(() => console.log('done!'))
  .catch((err) => {
    console.error(err)
  })

import Day from './day5';
import { dayRunner } from './test-runner';

const example = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

dayRunner(Day, example, 'CMZ', 'MCD');

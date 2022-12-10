import Day from './day9';
import { dayRunner } from './test-runner';

const example = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const example2 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

dayRunner(Day, example2, 13, 1);
dayRunner(Day, example, 88, 36);

#!/usr/bin/env node
import { astar } from './modules/astar';

astar({ station: 6, line: 'blue' }, { station: 13, line: 'green' });

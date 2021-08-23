#!/usr/bin/env node
import { qlearning } from './modules/qlearning';

const r = -0.4;
console.log('r: ', r);
qlearning(r);

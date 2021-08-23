#!/usr/bin/env node
import { hillclimbing } from './modules/hillclimbing';

for (let i = 0; i < 10; i++) {
  const { cost, path, timeElapsed } = hillclimbing();
  console.log(
    `iteração ${
      i + 1
    }:\npath: ${path}\ncost: ${cost}\ntimeElapsed: ${timeElapsed}\n`,
  );
}

import * as migration_20250521_182002_init from './20250521_182002_init';
import * as migration_20250531_030350 from './20250531_030350';

export const migrations = [
  {
    up: migration_20250521_182002_init.up,
    down: migration_20250521_182002_init.down,
    name: '20250521_182002_init',
  },
  {
    up: migration_20250531_030350.up,
    down: migration_20250531_030350.down,
    name: '20250531_030350'
  },
];

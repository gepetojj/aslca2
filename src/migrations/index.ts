import * as migration_20250521_182002_init from './20250521_182002_init';

export const migrations = [
  {
    up: migration_20250521_182002_init.up,
    down: migration_20250521_182002_init.down,
    name: '20250521_182002_init'
  },
];

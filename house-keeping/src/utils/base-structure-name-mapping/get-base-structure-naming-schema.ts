import { spawn } from 'child_process';
import { join as pathJoin, resolve as pathResolve } from 'path';
import { Writable } from 'stream';
import isWindows = require('is-windows');

const typeDefPathForSchema = pathJoin(
  __dirname,
  'base-structure-mapping.interface.d.ts' // compiled output
);

// with cwd as root to HK dir
const generatorExe = pathJoin(
  'node_modules',
  '.bin',
  `ts-json-schema-generator${isWindows() ? '.cmd' : ''}`
);

const feedingCwd = pathResolve(__dirname, '..', '..', '..');

// console.log({ typeDefPathForSchema, generatorExe, feedingCwd });

export function getBaseStructureNamingJsonSchema(): Promise<{
  [key: string]: any;
}> {
  return new Promise((resolve, reject) => {
    const keepStore: Buffer[] = [];
    const keepWritable = new Writable({
      write(chunk, enc, callback) {
        keepStore.push(chunk);
        callback();
      }
    });

    const schemaGeneratorProcess = spawn(
      generatorExe,
      ['--path', typeDefPathForSchema],
      {
        cwd: feedingCwd
      }
    );
    // schemaGeneratorProcess.stdout.pipe(process.stdout);
    // schemaGeneratorProcess.stderr.pipe(process.stdout);
    schemaGeneratorProcess.stdout
      .pipe(keepWritable)
      .on('finish', () => {
        const schemaAsString = Buffer.concat(keepStore).toString();
        const json: object = JSON.parse(schemaAsString);
        return resolve(json);
      })
      .on('error', err => reject(err));
  });
}

// getBaseStructureNamingJsonSchema().then(obj => console.log(obj));

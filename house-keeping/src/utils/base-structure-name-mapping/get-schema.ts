import { spawn } from 'child_process';
import { join as pathJoin, resolve as pathResolve } from 'path';
import { Writable } from 'stream';

const typeDefPathForSchema = pathJoin(
  __dirname,
  'base-structure-mapping.interface.ts'
);

export function getBaseStructureNamingJsonSchema(): Promise<object> {
  return new Promise(resolve => {
    const keepStore: Buffer[] = [];
    const keepWritable = new Writable({
      write(chunk, enc, callback) {
        keepStore.push(chunk);
        callback();
      }
    });

    const schemaGeneratorProcess = spawn(
      'node',
      [
        './node_modules/.bin/ts-json-schema-generator',
        '--path',
        typeDefPathForSchema
      ],
      {
        cwd: pathResolve(__dirname, '..', '..', '..')
      }
    );
    schemaGeneratorProcess.stdout.pipe(keepWritable).on('finish', () => {
      const schemaAsString = Buffer.concat(keepStore).toString();
      const json: object = JSON.parse(schemaAsString);
      return resolve(json);
    });
  });
}

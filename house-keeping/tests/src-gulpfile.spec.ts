import { promises as fs } from 'fs';
import { join, sep } from 'path';
import { spawnSync } from 'child_process';
import isWindows = require('is-windows');
import globby = require('globby');
import { convertToOriginalName } from '../dist/name-conversion';

const GEN_TEMPLATE = join(__dirname, '..', '..', 'generator', 'template');

const GULP = join(
  'node_modules',
  '.bin',
  `${isWindows() ? 'gulp.cmd' : 'gulp'}`
);

// create sample files
beforeAll(() => {
  return Promise.all([
    fs
      .mkdir(join(GEN_TEMPLATE, 'dir'))
      .then(() =>
        Promise.all([
          fs.writeFile(join(GEN_TEMPLATE, 'dir', '1.txt'), ''),
          fs.writeFile(join(GEN_TEMPLATE, 'dir', '.1.json'), ''),
          fs.writeFile(join(GEN_TEMPLATE, 'dir', 'we'), '')
        ])
      ),
    fs
      .mkdir(join(GEN_TEMPLATE, '.dot'))
      .then(() =>
        Promise.all([
          fs.writeFile(join(GEN_TEMPLATE, 'dir', '1.txt'), ''),
          fs.writeFile(join(GEN_TEMPLATE, 'dir', '.1.json'), ''),
          fs.writeFile(join(GEN_TEMPLATE, 'dir', 'we'), '')
        ])
      )
  ]);
});

describe('testing gulp file', () => {
  test('gulp.gClearDest', async () => {
    const r = spawnSync(
      GULP,
      ['gClearDest', '--gulpfile', join('dist', 'gulpfile.js')],
      {
        cwd: join(__dirname, '..')
      }
    );
    if (r.error) {
      throw r.error;
    }
    const files = await fs.readdir(GEN_TEMPLATE);
    expect(files.length).toBe(0);
    expect(r.stderr.toString()).toBe('');
  });

  test('gulp.gBuild', async () => {
    const r = spawnSync(
      GULP,
      ['gBuild', '--gulpfile', join('dist', 'gulpfile.js')],
      {
        cwd: join(__dirname, '..')
      }
    );
    if (r.error) {
      throw r.error;
    }
    const files = (
      await globby('../raw-template/**/*', {
        dot: true,
        cwd: __dirname
      })
    ).map(v => v.split('raw-template/')[1]);

    const BASE_FILES = (
      await globby(
        [
          '../../base-structure/**/*',
          '!../../base-structure/node_modules',
          '!../../base-structure/coverage',
          '!../../base-structure/_meta',
          '!../../base-structure/dist',
          '!../../base-structure/tests-dist',
          '!../../base-structure/package-lock.json'
        ],
        { dot: true, cwd: __dirname }
      )
    ).map(item => item.split('/base-structure/')[1]);

    expect(files.every(f => BASE_FILES.includes(f))).toBeTruthy();
    expect(BASE_FILES.every(f => files.includes(f))).toBeTruthy();
  });

  test('gulp.copyMeta', async () => {
    const r = spawnSync(
      GULP,
      ['copyMeta', '--gulpfile', join('dist', 'gulpfile.js')],
      {
        cwd: join(__dirname, '..')
      }
    );
    if (r.error) {
      throw r.error;
    }
    const files = (
      await globby(['../../base-structure/_meta/**/*'], {
        dot: true,
        cwd: __dirname
      })
    ).map(v => v.split('_meta/')[1]);

    const target = (
      await globby('../../generator/src/app/**/*', {
        cwd: __dirname,
        dot: true
      })
    ).map(v => v.split('src/app/')[1]);

    expect(files.every(f => target.includes(f))).toBeTruthy();
    expect(target.indexOf('get-full-prompts.ts') > -1).toBeTruthy();
  });

  test('testing convert name', async () => {
    const r = spawnSync(
      GULP,
      ['convertName', '--gulpfile', join('dist', 'gulpfile.js')],
      {
        cwd: join(__dirname, '..')
      }
    );
    if (r.error) {
      throw r.error;
    }

    const baseFiles = (
      await globby('../raw-template/**/*', {
        dot: true,
        cwd: __dirname
      })
    ).map(v => v.split('raw-template/')[1]);

    const files = (
      await globby('../../generator/template/**/*', {
        dot: true,
        cwd: __dirname
      })
    )
      .map(v => v.split('/template/')[1])
      .map(v =>
        v
          .split(sep)
          .map(w => convertToOriginalName(w))
          .join(sep)
      );

    expect(files.every(f => baseFiles.includes(f))).toBeTruthy();
    expect(baseFiles.every(f => files.includes(f))).toBeTruthy();
  });
});

import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

describe('generator-ts-np:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  test('creates static files', () => {
    assert.file([
      '.roughs/README.md',
      '.vscode/launch.json',
      'src/index.ts',
      'tests/add.spec.ts',
      'typings/typings.d.ts',
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      '.prettierignore',
      '.prettierrc',
      'ci-jest.config.json',
      'gulpfile.js',
      'tslint.json',
      'tsconfig.json',
      'media/.gitkeep',
    ]);
  });

  test('creates rendered files', () => {
    assert.file(['package.json', 'README.md']);
  });
});

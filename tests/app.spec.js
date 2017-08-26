'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ts-np:app', () => {
    beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({ someAnswer: true });
    });

    it('creates static files', () => {
        assert.file([
            'tslint.json',
            'tsconfig.json',
            '.vscode/launch.json',
            'media/cong.jpg',
            'src/index.ts',
            'tests/index.spec.ts',
            'typings/lme.d.ts',
            'typings/typings.d.ts',
            'gulpfile.ts',
        ]);
    });

    it('creates accessory files', () => {
        assert.file([
            'accessories/building-log.ts',
            'accessories/formatting-log.ts',
            'accessories/lint-noFix-log.ts',
            'accessories/linting-log.ts',
            'accessories/pre-commit-log.ts',
            'accessories/prepublish-log.ts',
            'accessories/real-build-log.ts',
            'accessories/test-log.ts',
            'accessories/test-watch-log.ts'
        ]);
    });

    it('creates rendered files', () => {
        assert.file([
            'index.d.ts',
            'package.json',
            'README.md',
        ]);
    });

    it('creates dot files files', () => {
        assert.file([
            '.editorconfig',
            '.gitignore',
            '.npmignore',
            '.travis.yml'
        ]);
    });
});
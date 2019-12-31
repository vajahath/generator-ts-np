import * as helpers from 'yeoman-test';
import * as path from 'upath';
import * as yoAss from 'yeoman-assert';
import globby = require('globby');
import { renderFile as rf } from 'ejs';
import {
  convertToOriginalName,
  convertToTemplateName
} from '../dist/app/name-conversion';

const pkg = require('../package.json');

function renderFile(filePath: string, data: object): Promise<string> {
  return new Promise((resolve, reject) => {
    rf(filePath, data, (err, str) => {
      if (err) {
        return reject(err);
      }
      return resolve(str);
    });
  });
}

const testData = {
  npmScope: 'npmScope',
  packageName: 'packageName',
  githubUsername: 'githubUsername',
  githubRepositoryName: 'githubRepositoryName',
  packageDescription: 'packageDescription',
  enginesNode: 'enginesNode',
  ownerFullName: 'ownerFullName',
  ownerEmail: 'ownerEmail@test.com',
  licenceYear: 'licenceYear',
  twitterUsername: 'twitterUsername'
};

describe('generate a project', () => {
  test(
    'generate',
    () =>
      helpers
        .run(path.join(__dirname, '..', 'dist', 'app'))
        .inTmpDir(dir => console.log(`> tempDir: ${dir}`))
        .withPrompts(testData)
        .then(async dir => {
          const BASE_FILES = (
            await globby(['../template/**/*'], { dot: true, cwd: __dirname })
          )
            .map(item => item.split('/template/')[1])
            .map(v =>
              v
                .split('/')
                .map(w => convertToOriginalName(w))
                .join('/')
            );

          for (const file of BASE_FILES) {
            const tmpFile = path.join(dir, file);
            yoAss.file(tmpFile);

            const renderedContent = await renderFile(
              path.join(
                __dirname,
                '..',
                'template',
                file
                  .split('/')
                  .map(v => convertToTemplateName(v))
                  .join('/')
              ),
              {
                ...testData,
                scopedPackageName: `@${testData.npmScope}/${testData.packageName}`,
                tsnpVersion: pkg.version
              }
            );

            yoAss.fileContent(tmpFile, renderedContent);
          }
        }),
    10000
  );
});

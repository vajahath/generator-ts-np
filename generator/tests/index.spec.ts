import * as helpers from 'yeoman-test';
import * as path from 'path';
import * as yoAss from 'yeoman-assert';

describe('generate a project', () => {
  test.only('generate', () => {
    return helpers
      .run(path.join(__dirname, '..', 'dist', 'app'))
      .inTmpDir(dir => console.log(`> tepDir: ${dir}`))
      .withPrompts({
        npmScope: 'npmScope',
        packageName: 'packageName',
        githubUsername: 'githubUsername',
        githubRepositoryName: 'githubRepositoryName',
        packageDescription: 'packageDescription',
        enginesNode: 'enginesNode',
        ownerFullName: 'ownerFullName',
        ownerEmail: 'ownerEmail',
        licenceYear: 'licenceYear',
        twitterUsername: 'twitterUsername'
      })
      .then(dir => {
        console.log('complete', dir);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

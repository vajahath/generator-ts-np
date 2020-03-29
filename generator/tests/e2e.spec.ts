import { spawn } from 'child_process';
import { join } from 'path';
import isWin = require('is-windows');
import { tmpdir } from 'os';
import mkdirp = require('mkdirp');
import globby = require('globby');
import upath = require('upath');

const tmpFolder = join(tmpdir(), Date.now().toString());
console.log({ tmpFolder });
mkdirp.sync(tmpFolder);

const TIMEOUT = 40000;
function runGenerator() {
  return new Promise((resolve, reject) => {
    const genProcess = spawn(
      join(
        __dirname,
        '..',
        'node_modules',
        '.bin',
        `${isWin() ? 'yo.cmd' : 'yo'}`
      ),
      [join(__dirname, '..', 'generators', 'app', 'index.js')],
      {
        cwd: tmpFolder,
      }
    );

    let err = false;
    genProcess.stdout.pipe(process.stdout);
    genProcess.stderr.pipe(process.stdout);

    genProcess.stderr.on(
      'error',
      () => (console.log('>>> genProcess.stderr'), (err = true))
    );

    const ipAgent = setInterval(() => genProcess.stdin.write('\n'), 600);
    const killSwitch = setTimeout(() => {
      genProcess.kill();
      return reject(
        new Error('process not completed within spec time. force killed')
      );
    }, TIMEOUT);

    genProcess.on('error', (e) => {
      clearInterval(ipAgent);
      err = true;
      console.log('>>> genProcess.on(err)');
      console.error(e);
    });

    genProcess.on('exit', (code) => {
      console.log('>>>>>>> exit code', code);
      clearTimeout(killSwitch);
      clearInterval(ipAgent);
      if (err || code !== 0) {
        return reject(new Error('Child process thrown error. see logs'));
      }
      return resolve();
    });
  });
}

beforeAll(() => runGenerator(), TIMEOUT + 5000);

test('verify there are all files', async () => {
  const baseFilesGlob = [
    '../../base-structure/**/*',
    '!../../base-structure/node_modules',
    '!../../base-structure/coverage',
    '!../../base-structure/_meta',
    '!../../base-structure/dist',
    '!../../base-structure/tests-dist',
    '!../../base-structure/package-lock.json',
  ];

  const filesGlob = upath.toUnix(upath.normalize(tmpFolder) + '/**/*');

  let [baseFiles, files] = await Promise.all([
    globby(baseFilesGlob, {
      dot: true,
      cwd: __dirname,
    }),
    globby(filesGlob, {
      dot: true,
    }),
  ]);

  // trim
  baseFiles = baseFiles.map((val) => val.split('/base-structure/')[1]);
  files = files.map((val) => val.split(upath.toUnix(tmpFolder) + '/')[1]);

  expect(files.includes('.yo-rc.json')).toBeTruthy();
  expect(baseFiles.every((f) => files.includes(f))).toBeTruthy();

  console.log({ files });
});

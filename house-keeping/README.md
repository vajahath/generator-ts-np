# tsnp_package_name

![](https://github.com/vajahath/npm-scope-prefixer/workflows/build-and-test/badge.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/npm-scope-prefixer.svg)](https://greenkeeper.io/)

CLI/API tool to prefix scope on npm packages, helpful for deploying to multiple npm registries with different scopes.

## Install

Requires Node >= 10.

From npm,

```sh
npm i -g @vaju/npm-scope-prefixer
```

From [Github Package Registry](https://github.com/vajahath/npm-scope-prefixer/packages). ([Guide](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages)).

_(✔ Type definitions included for TypeScript)_

## CLI Usage

```sh
$ npm-scope-prefixer --help

Usage: npm-scope-prefixer [options]

Changes the package.json name property to new scope.

Options:
  -V, --version          output the version number
  -s, --scope <scope>    The new scope you want to use
  -p, --pkg-path <path>  Absolute or relative path to package.json. If not provided, package.json in the
                         CWD is used.
  -h, --help             output usage information
```

### Example

```
$ npm-scope-prefixer --scope @billy
## Package name re-scoped ('@xxx/my-pkg' > '@billy/my-pkg')
```

The `@` in `--scope` is optional. If you skip it, this package internally adds `@`.

Also, you can optionally add path to the package.json. If not provided, package.json in the current working directory is used.

```
$ npm-scope-prefixer -s billy -p my/path/to/package.json
## Package name re-scoped ('@xxx/my-pkg' > '@billy/my-pkg')
```

#### As an npm script

Install as dev dep.

```sh
npm i --save-dev @vaju/npm-scope-prefixer
```

package.json

```json
{
  "scripts": {
    "rescope": "npm-scope-prefixer -s"
  }
}
```

machine/ci systems

```sh
npm run rescope @myorg
```

## APIs

```js
import { scopePrefixer } from 'npm-scope-prefixer';
// or
const { scopePrefixer } = require('npm-scope-prefixer');

// ...

await scopePrefixer(
  '@scope', // required
  'path/to/package.json' // optional
);
```

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)

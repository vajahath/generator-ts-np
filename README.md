# generator-ts-np

Yet another yeoman generator for building npm modules with TypeScript.

_TSNP stands for TypeScript Node Package 📦._

![](https://github.com/vajahath/generator-ts-np/workflows/Build/badge.svg) ![](https://github.com/vajahath/generator-ts-np/workflows/Deploy/badge.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/generator-ts-np.svg)](https://greenkeeper.io/)

🎁 If you are looking for using this generator, [see `/generator/README.md`](generator/README.md).

## Why

- No global dependencies.
- Written in TypeScript and when publishing, definition(`.d.ts`) will also ship with this package.
- Prettier and Eslint.
- Support for [Github Package Registry](https://github.com/features/packages) and [NPM](https://npmjs.com)
- Tests uses [Jest](https://jestjs.io) (tests are also written in TypeScript)
- Pre-publish hook for build (so you never miss it)
- Automated build and deployments (using Github Actions) (eg: [scope-prefixer package](https://github.com/vajahath/npm-scope-prefixer/commit/6294ca949db444de45e6668fb15a859c987dbbfd/checks?check_suite_id=327889691))
- Lint rules adopted from Google (which means higher coding standard)
- Publishes only the required files (less bundle size)

## Internals briefing

![](media/logo.jpg)

For future maintainability, the entire codebase is split into 3 distinct components.

- **`/base-structure`:** where the actual template reference lives. So if you have to tweak something related to the scaffolding template, raise a PR with altering it in this folder. Also you have to reflect these changes in `/base-structure/_meta`.
- **`/house-keeping`:** this component bridges `/base-structure` and the next component, `/generator`. It converts the keyed template files (that's how the template in `/base-structure` is defined) to files that support [ejs](https://ejs.co/) rendering and copy them to generator along with some meta files.
- **`/generator`:** the actual yeoman generator. This is what we are publishing.

Updates are maintained by Greenkeeper and `npm run build` is ran at this root level to update generator. This means, bare minimum human effort is required to update the generator.

## Something missing?

Please feel free to raise an issue.

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)

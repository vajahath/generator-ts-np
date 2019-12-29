
# generator-ts-np (v3 Preview 🧪)

Yet another yeoman generator for building npm modules with typescript.

![](https://github.com/vajahath/generator-ts-np/workflows/Build/badge.svg) ![](https://github.com/vajahath/generator-ts-np/workflows/Deploy/badge.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/generator-ts-np.svg)](https://greenkeeper.io/)


> This package is currently in beta.

🎁 If you are looking for using this generator, [see `/generator/README.md`](generator/README.md).

## Internals briefing

![](media/logo.jpg)

For future maintainability, the entire codebase is split into 3 distinct components.

- **`/base-structure`:** where the actual template reference lives. So if you have to tweak something related to the scaffolding template, raise a PR with altering it in this folder. Also you have to reflect these changes in `/base-structure/_meta`.
- **`/house-keeping`:** this component bridges `/base-structure` and the next component, `/generator`. It converts the keyed template files (that's how the template in `/base-structure` is defined) to files that support [ejs](https://ejs.co/) rendering and copy them to generator along with some meta files.
- **`/generator`:** the actual yeoman generator. This is what we are publishing.

## Something missing?

Please feel free to raise an issue.

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)



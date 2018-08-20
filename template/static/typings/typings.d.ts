/**
 * For including *.json file as
 * `import * as <stuff> from './stuffs.json';`
 */

declare module '*.json' {
  const val: any;
  export = val;
}

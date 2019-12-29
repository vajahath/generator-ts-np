import {
  convertToOriginalName,
  convertToTemplateName
} from '../dist/name-conversion';

describe('testing for err throwing', () => {
  test('/ throw err', () => {
    expect(()=>convertToOriginalName('testfadf/test')).toThrowError();
    expect(()=>convertToTemplateName('dsfdtest/test')).toThrowError();
  });
});

describe('testing actual functionality', () => {
  test('feeding names', () => {
    expect(convertToTemplateName('test-File.txt')).toBe(
      'TSNP_test-File.txt.tmpl'
    );
    expect(convertToOriginalName('TSNP_test-File.txt.tmpl')).toBe(
      'test-File.txt'
    );
    // dot file
    expect(convertToTemplateName('.txt')).toBe('TSNP_.txt.tmpl');
    expect(convertToOriginalName('TSNP_.txt.tmpl')).toBe('.txt');
  });
});

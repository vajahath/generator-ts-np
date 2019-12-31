export const PREFIX = 'TSNP_';
export const SUFFIX = '.tmpl';

export function convertToTemplateName(fileName: string) {
  if (fileName.includes('/') || fileName.includes('\\')) {
    throw new Error('Only fileName no / or \\');
  }

  return `${PREFIX}${fileName}${SUFFIX}`;
}

export function convertToOriginalName(fileName: string) {
  console.trace({ fileName });
  if (fileName.includes('/') || fileName.includes('\\')) {
    throw new Error('Only fileName no / or \\');
  }

  return fileName.slice(PREFIX.length, fileName.length - SUFFIX.length);
}

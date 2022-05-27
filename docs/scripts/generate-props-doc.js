#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const docgen = require('react-docgen-typescript').withCompilerOptions(
  {
    noErrorTruncation: true,
    compilerOptions: {
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      jsx: 'react-jsx',
      module: 'esnext',
      moduleResolution: 'node',
      noEmit: true,
      noUnusedLocals: true,
      skipLibCheck: true,
      strict: true,
      target: 'esnext',
      types: ['node', 'jest'],
    },
    include: ['**/*'],
    exclude: ['**/dist/**/*', 'docs', '**/node_modules/**/*'],
  },
  {
    propFilter: {
      skipPropsWithName: ['children'],
    },
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  }
);

// const resolvedPath = path.resolve('../../packages/divider/src/Divider.tsx');
// const resolvedPath = path.resolve('../../packages/box/src/Box.tsx');
// const resolvedPath = path.resolve('../../packages/accordion/src/Accordion.tsx');

const extensions = ['js', 'jsx', 'json', 'ts', 'tsx', 'tson'];
const exportRegex = /export {[^}]*} from ['"]([^;"]*)['"]/gs;

export const generateProps = sourceFileDir => {
  const packageSrcDir = path.join(sourceFileDir, 'src');

  const fileData = fs
    .readFileSync(path.join(packageSrcDir, 'index.ts'))
    .toString();

  const matches = Array.from(fileData.matchAll(exportRegex)).flatMap(
    // Convert into an absolute path with all possible extensions
    ([, filename]) =>
      extensions.map(ext => `${path.resolve(packageSrcDir, filename)}.${ext}`)
  );

  // Parse all the files for docgen info
  return docgen.parse(matches);
};

import fs from 'fs';
import path from 'path';
import docgenTypescript from 'react-docgen-typescript';

const docgen = docgenTypescript.withCompilerOptions(
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

const extensions = ['js', 'jsx', 'json', 'ts', 'tsx', 'tson'];
const exportRegex = /export {[^}]*} from ['"]([^'"]*)['"]/gs;
const repoRoot = path.resolve(path.basename(import.meta.url), '..', '..');

export const generateProps = sourceFileDir => {
  const packageSrcDir = path.join(repoRoot, sourceFileDir, 'src');

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

import fs from 'fs';
import path from 'path';
import docgenTypescript from 'react-docgen-typescript';

const repoRoot = path.resolve(path.basename(import.meta.url), '..', '..');

const tsConfig = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'tsconfig.json')).toString()
);

const docgen = docgenTypescript.withCompilerOptions(
  {
    ...tsConfig,
    noErrorTruncation: true,
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

export const generateProps = (sourceFileDir: string) => {
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

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  projects: ['<rootDir>/packages'],
  collectCoverageFrom: ['!**/dist/**', '!**/index.ts', '!**/*.{json,js}'],
};

module.exports = config;

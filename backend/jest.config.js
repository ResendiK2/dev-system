/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  rootDir: "src",
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  coverageDirectory: "../coverage",
};

const { jestConfig } = require("@salesforce/sfdx-lwc-jest/config");

module.exports = {
  ...jestConfig,
  modulePathIgnorePatterns: ["<rootDir>/.localdevserver"],
  moduleNameMapper: {
    "^lightning/modal$":
      "<rootDir>/custom-record-list/test/jest-mocks/lightning/modal/modal"
  }
};

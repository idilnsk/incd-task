require('dotenv').config({ path: '__tests__/.env.test.local' });


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
};

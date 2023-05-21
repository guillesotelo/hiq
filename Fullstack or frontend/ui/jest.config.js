module.exports = {
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/fileMock.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],
};
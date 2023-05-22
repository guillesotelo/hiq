module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // For transforming JavaScript and JSX files
        '^.+\\.tsx?$': 'ts-jest', // For transforming TypeScript files
    },
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/fileMock.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: ["**/*.test.mjs"],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.json',
        },
    },
    transformIgnorePatterns: [
        "node_modules/(?!troublesome-dependency/.*)",
    ],
};
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/config'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/modula.ts',
        '!config',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
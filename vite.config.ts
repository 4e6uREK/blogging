/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        threads: false,
        testTimeout: 5000,
        reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
        outputFile: {
            json: 'sonar-report.json',
            'vitest-sonar-reporter': 'sonar-report.xml'
        }
    }
});

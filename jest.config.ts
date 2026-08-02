import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './', // де знаходиться Next.js проект
})

const config: Config = {
  testEnvironment: 'jsdom', // симулює браузер для тестів
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
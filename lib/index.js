#!/usr/bin/env node

const { ESLint } = require('eslint')
const baseConfig = require('../.eslintrc.js')

async function main() {
  const eslint = new ESLint({ baseConfig })
  const results = await eslint.lintFiles('**/*.{ts,tsx,js,jsx}')
  const formatter = await eslint.loadFormatter("stylish")
  const resultText = formatter.format(results)
  console.log(resultText)
}

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
})


#!/usr/bin/env node

const { ESLint } = require('eslint')
const stylelint = require('stylelint')
const { loadJSONFromPkgSync } = require('./utils')

async function main() {
  const esLintbaseConfig = loadJSONFromPkgSync('.eslintrc.json')
  const styleLintConfig = loadJSONFromPkgSync('.stylelintrc.json')
  const eslint = new ESLint({ baseConfig: esLintbaseConfig })
  const results = await eslint.lintFiles('**/*.{ts,tsx,js,jsx}')
  const formatter = await eslint.loadFormatter("stylish")
  const ret = await stylelint.lint({
    config: styleLintConfig,
    files: '**/*.{css,scss}',
    formatter: 'string'
  })
  const resultText = formatter.format(results)
  console.log(resultText)
  console.log(ret.output)
}

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
})


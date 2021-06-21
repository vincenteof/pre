#!/usr/bin/env node

const { ESLint } = require('eslint')
const stylelint = require('stylelint')
const { loadJSONFromPkgSync } = require('./utils')

async function main() {
  const esLintbaseConfig = loadJSONFromPkgSync('.eslintrc.json')
  const styleLintConfig = loadJSONFromPkgSync('.stylelintrc.json')
  const eslint = new ESLint({ baseConfig: esLintbaseConfig })
  const [eslintResult, { output: stylelintResult }] = await Promise.all([
    (async () => {
      const results = await eslint.lintFiles('**/*.{ts,tsx,js,jsx}')
      const formatter = await eslint.loadFormatter("stylish")
      return formatter.format(results)
    })(),
    stylelint.lint({
      config: styleLintConfig,
      files: '**/*.{css,scss}',
      formatter: 'string'
    })
  ])
  console.log(eslintResult)
  console.log(stylelintResult)
}

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
})


#!/usr/bin/env node

const { ESLint } = require('eslint')
const stylelint = require('stylelint')
const { loadJSONFromPkgSync } = require('./utils')

function countESLintErrors(results) {
  let errorCount = 0
  let warningCount = 0
  for (const result of results) {
    errorCount += result.errorCount
    warningCount += result.warningCount
  }
  return { errorCount, warningCount }
}

async function main() {
  const esLintbaseConfig = loadJSONFromPkgSync('.eslintrc.json')
  const styleLintConfig = loadJSONFromPkgSync('.stylelintrc.json')
  const eslint = new ESLint({ baseConfig: esLintbaseConfig })

  async function esLintProcess() {
    const results = await eslint.lintFiles('**/*.{ts,tsx,js,jsx}')
    const formatter = await eslint.loadFormatter("stylish")
    return {
      resultsFormatted: formatter.format(results),
      results
    }
  }

  async function styleLintProcess() {
    return stylelint.lint({
      config: styleLintConfig,
      files: '**/*.{css,scss}',
      formatter: 'string'
    })
  }

  const [
    { results: eslintResult, resultsFormatted: eslintResultFormatted },
    { errored: styleLintErrored, output: stylelintResultFormatted }
  ] = await Promise.all([
    esLintProcess(),
    styleLintProcess()
  ])

  const { errorCount } = countESLintErrors(eslintResult)
  console.log(eslintResultFormatted)
  console.log(stylelintResultFormatted)

  process.exitCode = errorCount || styleLintErrored ? 1 : 0
}

main().catch((error) => {
  process.exitCode = 2;
  console.error(error);
})


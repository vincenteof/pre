#!/usr/bin/env node

const { Command } = require('commander');
const { loadJSONFromPkgSync } = require('./utils')

const pkgJson = loadJSONFromPkgSync('package.json')
const program = new Command()

program
  .version(pkgJson.version)
  .command('lint', 'lint all kinds of fiels')
  .command('prettier', 'formatt codes')

program.parse(process.argv)
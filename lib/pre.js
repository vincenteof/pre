#!/usr/bin/env node

const { Command } = require('commander');
const { readFileSync } = require('fs')
const { fileNameFromPkg } = require('./utils')

const pkgJson = JSON.parse(readFileSync(fileNameFromPkg('package.json')))
const program = new Command()

program
  .version(pkgJson.version)
  .command('lint', 'lint all kinds of fiels')

program.parse(process.argv)
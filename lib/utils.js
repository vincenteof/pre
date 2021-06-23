const { readFileSync } = require('fs')

function fileNameFromPkg(name) {
  return `${__dirname}/../${name}`
}

function loadJSON(fileName) {
  return JSON.parse(readFileSync(fileName))
}

function loadJSONFromPkgSync(name) {
  return loadJSON(fileNameFromPkg(name))
}

module.exports = {
  loadJSONFromPkgSync,
  fileNameFromPkg,
  loadJSON
}
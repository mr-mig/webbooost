#!/usr/bin/env ts-node-script
import * as path from 'path'
import * as fs from 'fs'

if (process.argv.length >= 4) {
  const dir = path.resolve(process.argv[3])
  const manifestFile = path.join(dir, 'manifest.json')
  const packageFile = path.join(dir, 'package.json')
  const manifest = require(manifestFile)
  const packageJSON = require(packageFile)

  let version = packageJSON.version.match(/^(\d+)\.(\d+)\.(\d+)$/)
  version.shift()
  const oldVersion = version.join('.')

  switch (process.argv[2]) {
    case 'patch':
      version[2] = parseInt(version[2]) + 1
      break;
    case 'minor':
      version[1] = parseInt(version[1]) + 1
      version[2] = 0
      break;

    case 'major':
      version[0] = parseInt(version[0]) + 1
      version[1] = 0
      version[2] = 0
      break;
  }

  version = version.join('.')
  console.log('version bumped:', oldVersion + ' -> ' + version)

  manifest.version = version
  packageJSON.version = version
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
  console.log('manifest.json updated')
  fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 2))
  console.log('package.json updated')
} else {
  console.log('usage: bump <action>')
}

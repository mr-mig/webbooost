#!/usr/bin/env ts-node-script

import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

const args = process.argv.splice(2);
const module = args[0];
const link = args[1];

const injecteesPath = path.join(__dirname, '..', 'injectees', module);

fs.readdir(injecteesPath, (err, files) => {
  if (!files) {
    console.error('No directory found for module ' + module);
    return;
  }
  for (dir in files) {
    const _dir = dir;
    fs.stat(path.join(injecteesPath, _dir), (err, st) => {
      if (st.isDirectory()) {
        sendRequest(_dir);
      }
    });
  }
});

function sendRequest(version) {
  const url = path.join(link.replace, /\$v /, version);
  console.log('Downloading module', module, 'from', url);
  setTimeout(() => {
    http.get('http://' + url).on('response', (res) => {
      const [first, ...rest] = url.split('/');
      const last = rest[rest.length - 1];
      console.log('Downloaded version', version);
      res.pipe(fs.createWriteStream(path.join(injecteesPath, version, last)));
    });
  }, 1000);
}

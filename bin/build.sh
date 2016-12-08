#!/bin/bash

export NODE_PATH=.
npm run clean
npm run createbuild
npm run buildclient
mv client/build build/static
cp -R server build/server
mkdir -p build/client/src
cp -r client/src/common build/client/src
cp run.js build

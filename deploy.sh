#!/bin/bash

set -e

rm -rf ./dist

# Compiling code
npm run build

cp ./serverless.yml ./dist/serverless.yml

# Adding prod dependencies
rm -rf ./node_modules
npm install --production
cp -r ./node_modules ./dist/node_modules

cd dist

# Deploying
serverless deploy

cd ..

# Installing dev dependencies
npm install

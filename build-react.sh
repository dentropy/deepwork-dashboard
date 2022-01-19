#!/bin/bash
cd frontend && npm run build
cp -r build/* ../backend/_site/


#!/bin/bash
cd ~/Computer/arteteco.github.io
git add .
git commit -m "${1:-aggiornamento}"
git push

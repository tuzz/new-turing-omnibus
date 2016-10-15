PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: all test build

all: test build

test: node_modules
	jasmine

build: node_modules
	browserify lib/app.js -o bundle.js -s App

node_modules:
	npm install

PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: all test build clean

all: test build

test: node_modules
	jasmine

build: node_modules
	mkdir -p bin
	browserify lib/application.js > bin/application.js

node_modules:
	npm install

clean:
	rm -rf node_modules
	rm -rf bin

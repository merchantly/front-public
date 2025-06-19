all: info clean install build test

info:
	node --version
	python --version

clean:
	rm -fr ./node_modules

install:
	npm install -g yarn
	yarn install

deps:
	arch -x86_64 pyenv install

build:
	yarn build

npm-purge:
	npm config set registry http://registry.npmjs.org/ --global
	npm cache clear --force

.PHONY: test
test:
	yarn test:browser
	yarn test:prerender

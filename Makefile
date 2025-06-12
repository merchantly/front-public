all:
	node --version
	python --version
	rm -fr ./node_modules
	npm install
	npm install -g yarn
	yarn install
	yarn build

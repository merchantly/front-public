.PHONY: deps deps-node deps-ruby deps-chrome build test clean

# Установка всех зависимостей
deps: deps-node deps-ruby deps-chrome

# Node.js зависимости
deps-node:
	yarn install

# Ruby зависимости (для MiniRacer)
deps-ruby:
	bundle install

# Chrome для mocha-chrome тестов
deps-chrome:
	@which chromium-browser > /dev/null 2>&1 || which google-chrome > /dev/null 2>&1 || \
		(echo "Installing Chromium..." && sudo apt-get update && sudo apt-get install -y chromium-browser)

# Сборка
build:
	yarn build

# Запуск всех тестов
test:
	yarn test

# Запуск отдельных тестов
test-browser:
	yarn test:browser

test-prerender:
	yarn test:prerender

test-mini-racer:
	yarn test:mini_racer

# Очистка
clean:
	yarn clean

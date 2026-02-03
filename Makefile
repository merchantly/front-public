# Shell settings for proper signal handling (Ctrl+C)
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

# Load environment variables from infra repo (if available)
INFRA_DIR ?= $(HOME)/code/brandymint/infra

# Docker Registry
REGISTRY ?= cr.selcloud.ru/brandymint
IMAGE_NAME ?= ssr-service
SEMVER_BIN ?= ./bin/semver
SEMVER = $(shell ${SEMVER_BIN})
STAGE ?= production

.PHONY: deps deps-node deps-ruby deps-chrome build test clean
.PHONY: release major minor patch bump-major bump-minor bump-patch push-semver
.PHONY: patch-release minor-release major-release commit-release push-release
.PHONY: guard-tag-exists docker-build docker-push build-and-push deploy
.PHONY: dev test-ssr help

# Default target
release: patch-release

# === Version management ===

major:
	@${SEMVER_BIN} inc major

minor:
	@${SEMVER_BIN} inc minor

patch:
	@${SEMVER_BIN} inc patch

bump-major: major push-semver
bump-minor: minor push-semver
bump-patch: patch push-semver

push-semver:
	@echo "Increment version to ${SEMVER}"
	@git add .semver
	@git commit -m "${SEMVER}"
	@git push

# === Release workflow ===

patch-release: patch commit-release push-release build-and-push deploy
minor-release: minor commit-release push-release build-and-push deploy
major-release: major commit-release push-release build-and-push deploy

commit-release: ## Commit version bump
	@echo "Committing release ${SEMVER}..."
	@git add .semver
	@git commit -m "Release ${SEMVER}"
	@git push

push-release:
	@gh release create ${SEMVER} --generate-notes
	@git fetch --tags

# === Docker build & deploy ===

guard-tag-exists:
	@git fetch --tags --quiet
	@VERSION=$$(${SEMVER_BIN}); \
	VERSION=$${VERSION#v}; \
	git rev-parse "v$$VERSION" >/dev/null 2>&1 || \
		(echo "Error: Tag 'v$$VERSION' does not exist in git" && exit 1)

docker-build: ## Build Docker image with version tags
	@trap 'echo ""; echo "Build interrupted"; exit 130' INT TERM; \
	echo "Building Docker image..."; \
	START=$$(date +%s); \
	VERSION=$$(${SEMVER_BIN}); \
	VERSION=$${VERSION#v}; \
	docker build \
		-t $(IMAGE_NAME):dev -t $(IMAGE_NAME):$$VERSION \
		-t $(REGISTRY)/$(IMAGE_NAME):latest -t $(REGISTRY)/$(IMAGE_NAME):$$VERSION .; \
	END=$$(date +%s); \
	echo "Docker image built: $(IMAGE_NAME):dev, $(IMAGE_NAME):$$VERSION"; \
	echo "Docker image built: $(REGISTRY)/$(IMAGE_NAME):latest, $(REGISTRY)/$(IMAGE_NAME):$$VERSION"; \
	echo "Build time: $$((END - START)) seconds"

docker-push: ## Push Docker image to registry
	@trap 'echo ""; echo "Push interrupted"; exit 130' INT TERM; \
	echo "Pushing Docker image to $(REGISTRY)..."; \
	VERSION=$$(${SEMVER_BIN}); \
	VERSION=$${VERSION#v}; \
	docker push $(REGISTRY)/$(IMAGE_NAME):latest && \
	docker push $(REGISTRY)/$(IMAGE_NAME):$$VERSION; \
	echo "Docker images pushed: $(REGISTRY)/$(IMAGE_NAME):latest, $(REGISTRY)/$(IMAGE_NAME):$$VERSION"

build-and-push: docker-build docker-push ## Build and push Docker image
	@echo "Build and push completed!"

deploy: guard-tag-exists ## Deploy via infra repo
	@test -n "$(INFRA_DIR)" || (echo "Error: INFRA_DIR is not set" && exit 1)
	@trap 'echo ""; echo "Deploy interrupted"; exit 130' INT TERM; \
	VERSION=$$(${SEMVER_BIN}); \
	VERSION=$${VERSION#v}; \
	echo "Deploying $(IMAGE_NAME) $$VERSION to $(STAGE)..."; \
	cd $(INFRA_DIR) && direnv exec . $(MAKE) app-deploy APP=$(IMAGE_NAME) STAGE=$(STAGE) TAG=$$VERSION; \
	echo ""; \
	echo "Deploy completed!"; \
	echo "  Image: $(REGISTRY)/$(IMAGE_NAME):$$VERSION"; \
	echo "  Stage: $(STAGE)"

# === Development ===

deps: deps-node deps-ruby deps-chrome ## Install all dependencies

deps-node:
	yarn install

deps-ruby:
	bundle install

deps-chrome:
	@which chromium-browser > /dev/null 2>&1 || which google-chrome > /dev/null 2>&1 || \
		(echo "Installing Chromium..." && sudo apt-get update && sudo apt-get install -y chromium-browser)

build: ## Build bundles for production
	yarn build

dev: ## Run SSR development server
	cd server && bun run index.ts

test: ## Run all tests
	yarn test

test-browser:
	yarn test:browser

test-prerender:
	yarn test:prerender

test-mini-racer:
	yarn test:mini_racer

test-ssr: ## Run SSR streaming tests
	yarn test:ssr

clean: ## Clean build artifacts
	yarn clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

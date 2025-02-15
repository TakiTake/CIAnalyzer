VERSION 0.6

# TypeScript build
FROM node:16.17.0
LABEL org.opencontainers.image.source=https://github.com/Kesin11/CIAnalyzer
LABEL org.opencontainers.image.authors=kesin1202000@gmail.com
WORKDIR /build

all:
  BUILD +build
  BUILD +test
  BUILD +docker

deps:
  COPY package.json package-lock.json .
  RUN --mount=type=cache,target=/root/.npm npm ci
  SAVE IMAGE --cache-hint

build:
  FROM +deps
  COPY --dir src tsconfig.json .
  COPY ./proto+protoc/pb_types src/pb_types
  RUN npm run build:clean
  SAVE ARTIFACT dist AS LOCAL ./dist
  SAVE IMAGE --cache-hint

proto:
  BUILD ./proto+protoc
  COPY ./proto+protoc/pb_types /tmp/pb_types
  COPY ./proto+protoc/schema /tmp/schema
  SAVE ARTIFACT /tmp/pb_types/* AS LOCAL ./src/pb_types/
  SAVE ARTIFACT /tmp/schema/* AS LOCAL ./bigquery_schema/
  SAVE IMAGE --cache-hint

test:
  FROM +deps
  COPY --dir src tsconfig.json \
      __tests__ jest.config.js bigquery_schema ./
  COPY ./proto+protoc/pb_types src/pb_types
  COPY ./proto+protoc/schema bigquery_schema/
  RUN npm run test:ci
  SAVE ARTIFACT junit AS LOCAL ./junit
  SAVE ARTIFACT coverage AS LOCAL ./coverage

docker:
  FROM node:16-alpine
  WORKDIR /ci_analyzer
  # Resolve nodejs pid=1 problem
  RUN apk add --no-cache tini

  # Download dependencies
  COPY package.json package-lock.json .
  RUN npm ci --production && rm -rf ~/.npm

  COPY README.md LICENSE ci_analyzer.yaml .
  COPY ./proto+protoc/schema bigquery_schema/
  COPY +build/dist ./dist

  # Make "ci_analyzer" command alias
  RUN cd dist && ln -s index.js ci_analyzer && chmod +x ci_analyzer
  ENV PATH=/ci_analyzer/dist:$PATH

  ENTRYPOINT [ "/sbin/tini", "--", "node", "/ci_analyzer/dist/index.js" ]
  WORKDIR /app

  SAVE IMAGE ghcr.io/kesin11/ci_analyzer:latest

docker-push:
  FROM +docker
  ARG --required TAGS

  FOR TAG IN $TAGS
    SAVE IMAGE --push $TAG
  END

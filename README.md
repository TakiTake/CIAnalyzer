# CIAnalyzer
Export multi CI service build data for analyzing.

# Install
```bash
npm ci
```

# USAGE
## Set ENV
### auth

- services
  - GITHUB_TOKEN
  - CIRCLECI_TOKEN
  - JENKINS_USER
  - JENKINS_TOKEN
- exporter
  - GOOGLE_APPLICATION_CREDENTIALS=/path/to/gcp/service_account.json

### debug
- CI_ANALYZER_DEBUG=1

## Change config
Edit config [ci_analyzer.yaml](./ci_analyzer.yaml)

## Execute
```bash
npm run start
```

# Execute using docker image
```bash
docker run \
  --mount type=bind,src=${PWD}/ci_analyzer.yaml,dst=/app/ci_analyzer.yaml \
  --mount type=bind,src=${PWD}/output,dst=/app/output \
  --mount type=bind,src=${PWD}/.ci_analyzer,dst=/app/.ci_analyzer \
  -e GITHUB_TOKEN=${GITHUB_TOKEN} \
  -e CIRCLECI_TOKEN=${CIRCLECI_TOKEN} \
  -e JENKINS_USER=${JENKINS_USER} \
  -e JENKINS_TOKEN=${JENKINS_TOKEN} \
  ci_analyzer:latest
```

## mount
- ci_analyzer.yaml: Your config file.
- output/: `local_exporter` output default directory. you can change it by config.
- .ci_analyzer/: CIAnalyzer internal using directory for multi purpose.
  - Store last run number.

## network
If your jenkins is working on docker host machine, you should not use "localhost" to jenkins.baseUrl config. Docker can not access your Jenkins server by "localhost".

For resolve this issue, you should use host machine IP address. For example, "http://192.168.0.1:8080".

# LICENSE
MIT

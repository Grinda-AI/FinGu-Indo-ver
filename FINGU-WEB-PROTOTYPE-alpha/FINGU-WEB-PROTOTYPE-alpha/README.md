# FINGU-WEB-PROTOTYPE

This is a repo for fingu web prototype

## Live preview

alpha release: https://fingu-web-alpha.23.94.26.231.sslip.io

## To start development

```
npm i
npm run dev
```

or with docker

```
docker compose -f compose.local.yml up -d
```

and open localhost:3000

## To start deployment

```
docker compose -f compose.alpha.yml up
```

and open localhost:3000 or set a reverse proxy

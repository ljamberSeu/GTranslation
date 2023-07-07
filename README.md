# local development
`yarn`

open cmd and run:
`npm install -g @azure/static-web-apps-cli`

`set DATABASE_CONNECTION_STRING=Server="gtranslation.mysql.database.azure.com";User ID="jili10";Password="{}";Database="translations";`

start local dev:
`yarn run build`

`swa start ./build --data-api-location swa-db-connections`

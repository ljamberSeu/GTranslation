# local development

open cmd and run:
`npm install -g @azure/static-web-apps-cli`

`set DATABASE_CONNECTION_STRING=Server="gtranslation.mysql.database.azure.com";User ID="jili10";Password="{ASDlkj@123}";Database="translations";`

start local dev:
`swa start ./build --data-api-location swa-db-connections`

# yearlydiary-db

## Starting a local database

1. Set the `DATABASE_URL` environment variable to a valid postgres connection string. Example: `postgres://postgres:postgres@localhost:5432/yearlydiary`
2. Run `yarn start-local-db`

## Running migrations on a remote database

1. Set the `DATABASE_URL` environment variable to a valid postgres connection string. Example: `postgres://postgres:postgres@localhost:5432/yearlydiary`
2. Run `yarn boostrap-db`

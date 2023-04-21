# yearlydiary

[![GitHub license](https://img.shields.io/github/license/peterjuras/yearlydiary)](https://github.com/peterjuras/yearlydiary/blob/main/LICENSE) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/peterjuras/yearlydiary/ci.yml?branch=main)

[Check it out and start your yearly diary!](https://yearlydiary.vercel.app/)

Answer daily questions to keep a fun journal over the years!

![Example screenshot](./assets/example-screen.png)

See what others have answered throughout the years:

![Example screenshot of all answers](./assets/example-all-screen.png)

## Local setup

### Requirements

- Docker
- Node.js 16
- yarn v1

### Running the project locally

1. Install depdencies: `yarn`
1. Set the `DATABASE_URL` environment variable: `export DATABASE_URL=postgres://postgres:postgres@localhost:5432/yearlydiary`
1. Start the local database: `yarn --cwd db start-local-db`
1. Start the Next.js project: `yarn --cwd web dev`

You can then access the local web app at http://localhost:3000/

### Running tests locally

1. Run tests: `yarn test`

### Running end to end tests locally

1. Install playwright dependencies: `yarn --cwd web playwright install-deps`
1. Install playwright browsers: `yarn --cwd web playwright install`
1. Run end to end tests: `yarn --cwd web test:e2e`

### Deploying the project (vercel)

1. Create a Postgres 14 database instance, e.g. [elephantsql.com](https://www.elephantsql.com/) has free instances.
1. Create a [vercel](https://vercel.com/) project.
1. Set the following secrets in your GitHub Action settings of your project:

   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TOKEN`

   You can have a look at the [amondnet/vercel-action](https://github.com/amondnet/vercel-action) GitHub action readme to learn how to retrieve these values.

1. Set the `DATABASE_URL` environment URL from step 1 on your vercel project.
1. Enable GitHub actions and push to your `main` branch

## Credits

Concept & questions inspired by [this diary](https://www.odernichtoderdoch.de/3-jahres-tagebuch-glasmomente) that my wife got gifted from someone.

![odernichtoderdoch diary](./assets/onod-diary.jpg)

## License

This project is [MIT licensed](./LICENSE).

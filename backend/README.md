# Express API Starter with Typescript

How to use this template:

```sh
npx create-express-api --typescript --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```


## Project Documentation

### ERD
<img width="844" alt="image" src="https://github.com/user-attachments/assets/9324af93-b08f-4195-b201-0bc743a0727f">

### MVC Architecture Workflow
1. Route: The route is accessed via a web request.
2. Handler: The request is routed to a handler method in Handler.
3. Service: The handler method calls Service to perform business logic, such as fetching data from the database.
4. Response: The handler returns the processed data as an HTTP response.

Currently not yet separated as MVC, might do it later when there's time to further manage this project.
#   b e l a j a r - s m - d i k a  
 
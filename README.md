<!-- PROJECT HEAD -->
<br />
<p align="center">
  <h3 align="center">Enterprise Todo</h3>

  <p align="center">
    Your bogstandard todo app but developed in such a way that it could adhere with enterprise-level practices
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Testing](#testing)
* [Suggested Improvements](#suggested-improvements)
* [License](#license)

<!-- ABOUT THE PROJECT -->

## Built With

* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Mongooose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
* [Storybook](https://storybook.js.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

You'll need:
* npm
```sh
npm install npm@latest -g
```
* a running instance of the mongo daemon: installation instructions can be found [here](https://docs.mongodb.com/manual/installation/)

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/charlieShingleton/enterprise-todo.git
```
2. Cd into the repo
```sh
cd ./enterprise-todo
```
2. Install NPM packages
```sh
npm install
```
3. Populate the database with dummy data (this command can be used repeatedly to reset the database to a default state)
```sh
npm run db:populate
```
4. In the current terminal window run the back-end server
```sh
npm run serve:be
```
5. Open a separate terminal window and run the front-end server
```sh
npm run serve:fe
```
(6. Open a web browser and navigate to localhost:8080 (if the app has not opened automatically in your default browser))

## Testing

Application tests are grouped out into first front and back-end tests, then testing methodology by using npm scripts.

### Front-End:

Unit:
```sh
npm run test:unit-fe
```

Snapshot:
```sh
npm run storybook:test
```

E2E:
```sh
npm run test:e2e-fe
```

### Back-End:

Integration:
```sh
npm run test:integration-be
```


<!-- IMPROVEMENTS -->
## Suggested Improvements

* Create an 'Add Task' user-input form
* Add authentication and session management
* Achieve Continuous Integration and Continuous Deployment using [GitHub Actions](https://github.com/features/actions)
* Expand the front-end E2E testing with [Cypress](https://docs.cypress.io/api/api/table-of-contents.html)
* Expand and deepen initial tests across the board
* Replace MongoDB 'poplulate' script with Mongooose equivalent
* Containerize the application with a DOCKERFILE
* Schema validation on PUT/POST requests with [Joi](https://github.com/hapijs/joi) 

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

**Charlie Shingleton** - *Initial work* - [Charlie Shingleton](https://github.com/charlieShingleton)
Project Link: [https://github.com/charlieShingleton/enterprise-todo](https://github.com/charlieShingleton/enterprise-todo)

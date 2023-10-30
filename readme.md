## Ethereum Transactions List

This is a website that allows you connect your metatmask wallet, send Ethereum transactions and displays list of all sent Transactions.


### Setup

Step by step instructions on how to get the code setup locally. This may include:

- Open the terminal
- cd into directory that you want the project to reside.


- clone the repository into that directory.
```
git clone https://github.com/Dubby20/transactions-list.git
```

### Prerequisites
To successfully run and test this challenge, you'll need the following installed:


- Docker: Version 24 or newer:  [Docker](https://www.docker.com/)
- Metamask browser extension: [Metamask](https://metamask.io/)
- Mongodb Compass (Optional): [MongoDB Compass(GUI)](https://www.mongodb.com/try/download/compass)


### Starting the Project
- Run the docker containers:
```
docker compose up --build
```

- cd into the client directory folder
- Open another terminal
- Install all the project's dependencies:
```
run yarn install or npm install
```
- Once that's done, run the project:
```
yarn start or npm start
```

### Accessing the application:

- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql

### Dependencies

List of libraries, tools, etc used for this project

- TypeScript
- React - (UI library) - [React documentation](https://reactjs.org/)


### Testing tools

- [React Testing Library](https://testing-library.com/) - A Javascript test library.


Running unit tests.

- In a terminal, `cd` to the client directory folder.
- Run `yarn test` or `npm test`.

run dockerize application npm/yarn
yarn build && docker build -t test-node . && docker-compose down && docker-compose up


to-do: mongoose hook update and delete for cars and may be station document
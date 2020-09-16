# Apolloclient Demo
Ever wonder what the difference is in price by region? This demo has fake data that will tell you! Simply line up your customer and location to see how much they spent in each region for the same product.

## Certified for use with:
* **node**: v12.18.2
* **npm**: v6.14.5
* **React**: v16.13.1

## Distributed Microservices Demo
"Apollo Client Demo" is part of a complete distributed microservices demo that has a backend running "Apollo Server Demo" found [here](https://github.com/radkin/apolloserver_demo).
![root directory](src/assets/images/Apollo_client_server.png)

## Up and Running
You will need a running instance of the apolloserver_demo before this React pure client has any data. Please remember to run the test to populate redis with data. For local laptop and a locally running instances of apolloserver there is no need to do anything else. If deploying to Heroku hard set the apolloserver setting as there is nothing hidden in a pure client (browser). What is the point in trying to hide the backend server's URL when you can find it in the client code via your browser?

### Starting and stopping
For now, when developing the following commands preferable in separate windows
on the command-line (tmux is good).

**Start**: `npm run dev`
**Stop** `ctrl-c`

## Tests
* code coverage: `npm run coverage`
* Jest/Enzyme Tests
For local laptop: `npm run test`

## Author
radkin@github.com (not a proper email address)

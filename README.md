# pi-web-interface
A web interface for Raspberry Pi and hopefully any Linux machine.

## Prereqs
* Node.js
* MongoDB, running locally

## Setup
1. Run `bower install` in client directory.
2. Run `npm install` in server directory.
3. Run `cp .env.dev .env` in server directory to generate .env file.
4. Ensure `.env` is configured to your environment.
5. Run `gulp build` in the server directory to build
6. Use nodemon or `npm start` to start the server.
7. Navigate to `localhost:3000`, the dashboard should appear.

## Testing
Basic boilerplate for testing is in place, run `npm test` to check it out.

## Contributing
Please get in contact with an organization member to discuss steps for contributing.

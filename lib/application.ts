import http = require('http');
export class Application {
  constructor() {

  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      res.write('abb');
      res.end();
    });
    return server.listen.apply(server, args);
  }
}

export const createApplication = (): Application => {
  return new Application();
};
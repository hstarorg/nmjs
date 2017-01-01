const http = require('http');
import { app } from './../index';

app.use((req, res, next) => {
  next();
});

app.loadRoutes();

const server = http.createServer(app);
server.listen(3333, err => {
  if (err) {
    return console.error(err);
  }
  let addr = server.address();
  console.log(`Server started, address: ${addr.address}, port: ${addr.port}`);
});

const http = require('http');
import { app } from './nmjs';

app.use((req: any, res: any, next: Function) => {
  next();
});

app.loadRoutes();

const server = http.createServer(app);
server.listen(3333, (err: Error) => {
  if (err) {
    return console.error(err);
  }
  let addr = server.address();
  console.log(`Server started, address: ${addr.address}, port: ${addr.port}`);
});

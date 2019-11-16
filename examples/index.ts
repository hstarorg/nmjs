import * as http from 'http';
import { NmApp } from './nmjs';

import { FaqController } from './controllers/FaqController';

const app = new NmApp({});

app.registerController(FaqController);

const server = app
  .listen(3333, () => {
    const addr = server.address();
    console.log(`Server started, listening`, addr);
  })
  .on('error', err => {
    console.error(err);
  });

const app2 = new NmApp();
const server2 = http.createServer(app2.callback());
server2
  .listen(3334, () => {
    const addr = server2.address();
    console.log(`Server started, listening`, addr);
  })
  .on('error', err => {
    console.error(err);
  });

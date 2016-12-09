import MvcApp from './../index';

const app = MvcApp();

app.listen(3333)
  .then(server => {
    let addr = server.address();
    console.log(`Server started, address: ${addr.address}, port: ${addr.port}`);
  }).catch(err => {
    console.error(err);
  });

const http = require('http');
import NmApp from './../index';

const app = new NmApp();

app.use((req, res, next) => {

});

const server = http.createServer(app.init());
server.listen(3333, err => {
	if (err) {
		return console.error(err);
	}
	let addr = server.address();
	console.log(`Server started, address: ${addr.address}, port: ${addr.port}`);
});

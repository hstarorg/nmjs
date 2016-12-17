import http = require('http');
import { Request } from './request';

export class Response {

	public request: Request;

	constructor(private res: http.ServerResponse) {
	}

	send(body: any) {
		this.res.write(body);
		this.res.end();
	}

	end() {
		this.res.end();
	}
}
import http = require('http');
import { NmApp } from './application';
import { Request } from './request';
import { Response } from './response';

export class Context {
	public request: Request;
	public response: Response;
	constructor(req: http.IncomingMessage, res: http.ServerResponse, public app: NmApp) {
		this.request = new Request(req);
		this.response = new Response(res);
	}
}
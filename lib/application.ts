import http = require('http');
import EventEmitter = require('events');
import { Context } from './context';
import { Request } from './request';
import { Response } from './response';
import { Router } from './router';

export class NmApp extends EventEmitter.EventEmitter {

	private middleware: Array<Function> = [];
	private env = process.env.NODE_ENV || 'development';

	static Router = Router;

	constructor() {
		super();
	}

	init(): Function {
		return (req, res) => {
			let context = new Context(req, res, this);
			this.handlerRequest(context);
		}
	}

	handlerRequest(context: Context) {
		context.response.send('Test');
	}

	use(fn: Function) {
		this.middleware.push(fn);
		return this;
	}
}

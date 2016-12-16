import http = require('http');
import EventEmitter = require('events');
import { Context } from './context';
import { Request } from './request';
import { Response } from './response';

export class NmApp extends EventEmitter.EventEmitter {

	private middleware: Array<Function> = [];
	private env = process.env.NODE_ENV || 'development';

	constructor() {
		super();
	}

	init(): Function {
		return (req, res) => {
			let context = new Context(req, res, this);
			console.log(this);
		}
	}

	init2(req, res) {

	}

	use(fn: Function) {
		this.middleware.push(fn);
	}
}

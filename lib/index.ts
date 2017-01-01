const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

import { util } from './util';

app.loadRoutes = () => {
	let controllerFolder = path.join(process.cwd(), 'controllers');
	fs.readdirSync(controllerFolder).forEach(f => {
		let filePath = path.join(controllerFolder, f);
		let stat = fs.statSync(filePath);
		if (!stat.isFile() || path.extname(filePath) !== '.js') {
			console.warn(`${filePath} is not a controller file.`);
			return;
		}
		let ControllerClass = require(filePath).default;
		if (typeof ControllerClass !== 'function') {
			return;
		}
    util.registerRouter(app, ControllerClass);
	});
};

process.on('uncaughtException', err => {
	console.error(err);
});

export default app;

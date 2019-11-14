import * as Koa from 'koa';
import { NmAppOptions } from './NmAppOptions';

const defaultOptions: NmAppOptions = {};

export class NmApp {
  options: NmAppOptions;
  app: Koa;
  constructor(options: NmAppOptions) {
    this.options = Object.assign({}, defaultOptions, options);
    this.app = this._buildApp();
  }

  _buildApp(): Koa {
    const app = new Koa();
    return app;
  }
}

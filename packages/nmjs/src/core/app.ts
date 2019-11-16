import { Server, RequestListener } from 'http';
import { ListenOptions } from 'net';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as koaBody from 'koa-body';
import * as koaHelmet from 'koa-helmet';
import { NmAppOptions, MiddlewareConfig } from './NmAppOptions';
import { appUtil } from './appUtil';
import { Controller } from './Controller';

const defaultOptions: NmAppOptions = {};

type OptionsKeys = 'cors' | 'helmet';

export class NmApp {
  _options: NmAppOptions;
  _app: Koa;
  constructor(options?: NmAppOptions) {
    this._options = Object.assign({}, defaultOptions, options);
    this._app = this._buildApp();
  }

  _getOptions(key: OptionsKeys): MiddlewareConfig<any> {
    const opt = this._options[key];
    return opt;
  }

  /**
   * 绑定默认中间件
   * @param app
   */
  _bindDefaultMiddlewares(app: Koa) {
    // Helmet
    const helmetConf = this._getOptions('helmet');
    if (helmetConf && helmetConf.enable) {
      app.use(koaHelmet(helmetConf.options));
    }
    // Cors
    const corsConf = this._getOptions('cors');
    if (corsConf && corsConf.enable) {
      app.use(cors(corsConf.options));
    }
    // Body
    app.use(koaBody(this._options.bodyOptions));
  }

  _buildApp(): Koa {
    const app = new Koa();
    this._bindDefaultMiddlewares(app);
    return app;
  }

  // 监听
  listen(port: number, hostname?: string, listeningListener?: () => void): Server;
  listen(port: number, backlog?: number, listeningListener?: () => void): Server;
  listen(port: number, listeningListener?: () => void): Server;
  listen(path: string, backlog?: number, listeningListener?: () => void): Server;
  listen(path: string, listeningListener?: () => void): Server;
  listen(options: ListenOptions, listeningListener?: () => void): Server;
  listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
  listen(handle: any, listeningListener?: () => void): Server;
  listen(...args: any[]): Server {
    return this._app.listen(...args);
  }

  callback(): RequestListener {
    return this._app.callback();
  }

  registerController(ctrlClass: typeof Controller): void {
    appUtil.registerController(this._app, ctrlClass);
  }
}

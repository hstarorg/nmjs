import http = require('http');
import EventEmitter = require('events');
import accepts = require('accepts');
// import Cookies = require('cookies');
import { Request } from './request';
import { Response } from './response';
import { Context } from './context';

export class MvcApp extends EventEmitter.EventEmitter {

  private middleware: Array<Function> = [];
  private env = process.env.NODE_ENV || 'development';
  public proxy: boolean = false;

  constructor() {
    super();
  }

  createContext(req: http.IncomingMessage, res: http.ServerResponse): Context {
    const context = new Context();
    // 初始化请求到context
    const request = context.request = new Request(req);
    const response = context.response = new Response(res);
    context.app = request.app = response.app = this;
    // 相互赋值
    request.response = response;
    response.request = request;

    context.originalUrl = request.originalUrl = req.url;
    // context.cookies = new Cookies(req, res, {
    //   keys: this.keys,
    //   secure: request.secure
    // });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }

  listen(port: number): Promise<any> {
    const server = http.createServer(this.createContext);
    return new Promise((resolve, reject) => {
      server.listen.call(server, port, err => {
        if (err) {
          return reject(err);
        }
        resolve(server);
      });
    });
  }
}

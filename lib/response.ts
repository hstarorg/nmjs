import http = require('http');
import { MvcApp } from './application';
import { Request } from './request';

export class Response {

  public app: MvcApp;
  public request: Request;

  constructor(private res: http.ServerResponse) {
    res.write('aaa');
    res.end();
  }
}
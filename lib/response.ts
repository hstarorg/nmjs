import http = require('http');
import { Request } from './request';

export class Response {

  public request: Request;

  constructor(private res: http.ServerResponse) {
    res.write('aaa');
    res.end();
  }
}
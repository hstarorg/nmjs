import { MvcApp } from './application';
import { Request } from './request';
import { Response } from './response';

export class Context {

  public app: MvcApp;
  public request: Request;
  public response: Response;
  public originalUrl: string;
  public state: any;
  public accept: any;
  public cookies: any;

  constructor() {
  }
}
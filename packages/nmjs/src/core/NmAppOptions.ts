import * as cors from '@koa/cors';
import * as koaHelmet from 'koa-helmet';
import * as helmet from 'helmet';
import * as koaBody from 'koa-body';

export interface MiddlewareConfig<T> {
  enable?: boolean;
  options?: T;
}

export interface NmAppOptions {
  cors?: MiddlewareConfig<cors.Options>;
  helmet?: MiddlewareConfig<helmet.IHelmetConfiguration>;
  bodyOptions?: koaBody.IKoaBodyOptions;
}

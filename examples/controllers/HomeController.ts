import * as Koa from 'koa';
import { route, httpGet, Controller } from '../core/decorators';
import { apiPrefix } from '../config';

@route(`${apiPrefix}/faq`)
export class FaqController extends Controller {
  @httpGet('/')
  async getFaq(ctx: Koa.Context) {
    ctx.body = 'ok';
  }
}

import { route, Controller, Context, httpGet } from '../nmjs';

@route(`/faq`)
export class FaqController extends Controller {
  @httpGet('/')
  async getFaq(ctx: Context) {
    ctx.body = 'ok';
  }
}

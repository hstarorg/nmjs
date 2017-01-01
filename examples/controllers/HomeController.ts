import { Route, RoutePrefix, HttpMethods, Controller } from './../../index';

@RoutePrefix('/home')
export default class HomeController extends Controller {

  private getValue() {
    return Promise.resolve('Ok');
  }

  @Route('/test', HttpMethods.GET)
  async getIndex(req, res): Promise<any> {
    let v = await this.getValue();
    res.send(v);
  }
  @Route('/good', HttpMethods.GET)
  postIndex(req, res, next) {
    res.send('Good');
  }
}

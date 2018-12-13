import { Route, RoutePrefix, HttpMethods, Controller } from '../nmjs';

@RoutePrefix('/home')
export default class HomeController extends Controller {
  private getValue() {
    return Promise.resolve('Ok');
  }

  @Route('/test', HttpMethods.GET)
  async getIndex(req: any, res: any): Promise<any> {
    let v = await this.getValue();
    res.send(v);
  }
  @Route('/good', HttpMethods.GET)
  postIndex(req: any, res: any, next: Function) {
    res.send('Good');
  }
}

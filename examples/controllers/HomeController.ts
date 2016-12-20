import { Route, RoutePrefix, HttpMethods } from './../../index';

@RoutePrefix('api/v1')
export class HomeController {

	@Route('/', HttpMethods.GET)
	getIndex(): any {
		return 'OK';
	}
}

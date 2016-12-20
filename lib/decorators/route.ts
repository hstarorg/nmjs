import { HttpMethods } from './../enum';
export const Route = (path: string, methods: HttpMethods = HttpMethods.GET) => {
	return (target, key, descriptor) => {
		
	}
};

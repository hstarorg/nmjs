import { HttpMethods } from './../enum';
export const Route = (path: string, method: HttpMethods = HttpMethods.GET) => {
  return (target, key, descriptor) => {
    target.$$routes = target.$$routes || [];
    target.$$routes.push({
      path,
      method,
      actionName: key
    });
  }
};

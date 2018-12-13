import { HttpMethods } from './../enum';
export const Route = (path: string, method: HttpMethods = HttpMethods.GET) => {
  return (target: any, key: string, descriptor: any) => {
    target.$$routes = target.$$routes || [];
    target.$$routes.push({
      path,
      method,
      actionName: key
    });
  };
};

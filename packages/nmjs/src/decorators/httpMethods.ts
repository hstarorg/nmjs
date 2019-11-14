import 'reflect-metadata';

type Method = 'get' | 'post' | 'put' | 'delete' | 'all';

function createHttpMethodDecorator(method: Method) {
  return function httpPost(path: string): MethodDecorator {
    /**
     * target - 装饰的属性或方法所在类的原型
     */
    return function<T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
      Reflect.defineMetadata('routeConfig', { path: path || '', method }, descriptor.value);
    };
  };
}

const httpGet = createHttpMethodDecorator('get');
const httpPost = createHttpMethodDecorator('post');
const httpPut = createHttpMethodDecorator('put');
const httpDelete = createHttpMethodDecorator('delete');
const httpAll = createHttpMethodDecorator('all');

export { httpGet, httpPost, httpPut, httpDelete, httpAll };

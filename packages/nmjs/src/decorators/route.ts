import 'reflect-metadata';

export function route(basePath?: string): ClassDecorator {
  /**
   * target - 类本身，而非原型
   */
  return function(target) {
    Reflect.defineMetadata('basePath', basePath || '', target);
  };
}

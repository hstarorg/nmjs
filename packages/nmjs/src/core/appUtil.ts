import 'reflect-metadata';
import { Context } from 'koa';
import * as Router from 'koa-router';

type Route = { path: string; method: string; handle: (ctx: any) => void };

type RotueConfig = {
  basePath: string;
  routes: Route[];
  preRequest: (ctx: any, next?: any) => void;
};

const methodArr = ['get', 'post', 'put', 'delete', 'all'];

export const appUtil = {
  getRouteConfig(controllerCls: Function): RotueConfig {
    const basePath = Reflect.getMetadata('basePath', controllerCls);
    const proto = controllerCls.prototype;
    const preRequest = proto.preRequest;
    const routes: Route[] = [];
    Object.getOwnPropertyNames(proto)
      .filter((propName: string) => {
        // 排除构造函数、只选择方法
        return propName !== 'constructor' && typeof proto[propName] === 'function';
      })
      .forEach((propName: string) => {
        // 提取路由方法配置，加入到配置数组
        const fn = proto[propName];
        const routeConfig = Reflect.getMetadata('routeConfig', fn);
        // 选出合理的路由方法
        if (routeConfig && methodArr.includes(routeConfig.method) && routeConfig.path !== void 0) {
          routes.push({
            path: routeConfig.path,
            method: routeConfig.method,
            handle: fn,
          });
        }
      });

    return { basePath, routes, preRequest };
  },

  buildRouter(routeConfig: RotueConfig): Router {
    const router = new Router({
      prefix: routeConfig.basePath,
    });
    if (routeConfig.preRequest) {
      router.use((ctx, next) => routeConfig.preRequest(ctx, next));
    }
    routeConfig.routes.forEach(routeConf => {
      (router as any)[routeConf.method](routeConf.path, (ctx: Context) => routeConf.handle(ctx));
    });
    return router;
  },

  /**
   * 注册控制器
   * @param app
   * @param ctrlClass
   * @param apiPrefix
   */
  registerController(app: any, ctrlClass: Function) {
    const routeConfig = appUtil.getRouteConfig(ctrlClass);
    const router = appUtil.buildRouter(routeConfig);
    app.use(router.routes());
  },
};

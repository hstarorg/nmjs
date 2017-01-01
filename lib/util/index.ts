const Router = require('express').Router;

import { Controller } from './../interface/Controller';
import { HttpMethods } from './../enum';

export const util = {

  getActionMethod(method: HttpMethods): string {
    let fnName;
    switch (method) {
      case HttpMethods.GET:
        fnName = 'get';
        break;
      case HttpMethods.POST:
        fnName = 'post';
        break;
      case HttpMethods.PUT:
        fnName = 'put';
        break;
      case HttpMethods.DELETE:
        fnName = 'delete';
        break;
      default:
        fnName = 'get';
    }
    return fnName;
  },

  buildRouter(ctrlClass) {
    const router = new Router();
    const ctrlClassProto = ctrlClass.prototype;
    const propertyNames = Object.getOwnPropertyNames(ctrlClassProto);
    const routes = ctrlClass.prototype.$$routes || [];
    routes.forEach(route => {
      router[this.getActionMethod(route.method)](route.path, ctrlClassProto[route.actionName].bind(ctrlClassProto));
    });
    return router;
  },

  getControllerPrefix(ctrlClass): string {
    let routePrefix = ctrlClass.prototype.$$routePrefix;
    if (routePrefix === undefined) {
      routePrefix = '/' + ctrlClass.name.replace(/Controller$/g, '').toLowerCase();
    }
    return routePrefix;
  },

  registerRouter(app, ControllerClass) {
    if (!(ControllerClass.prototype instanceof Controller)) {
      console.warn(`controller ${ControllerClass.name} is not extends Controller`);
      return;
    }
    let routePath = this.getControllerPrefix(ControllerClass);
    let router = this.buildRouter(ControllerClass);
    app.use(routePath, router);
  }
};

export const RoutePrefix = (path: string) => {
  return target => {
    target.prototype.$$routePrefix = path;
  }
};

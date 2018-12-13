export const RoutePrefix = (path: string) => {
  return (target: Function) => {
    target.prototype.$$routePrefix = path;
  };
};

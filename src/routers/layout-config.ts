const hideHeader = ["/login", "/signup"];

{
  /*const isInRoute = (pathname: string, routes: string[]) => {
  Boolean(
    routes.find((x) => {
      if (x.endsWith("*") && RegExp(x).test(pathname)) return true;
      return x === pathname;
    })
  );
};*/
}

const isInRoute = (pathname: string, routes: string[]): boolean => {
  return routes.filter((route) => route === pathname).length > 0;
};
export const isHideHeader = (pathName: string): boolean =>
  isInRoute(pathName, hideHeader);

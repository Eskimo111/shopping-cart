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
  console.log(pathname);
  routes.forEach((route) => {
    if (route === pathname) console.log("match!!");
  });
  return true;
};
export const isHideHeader = (pathName: string): boolean =>
  isInRoute(pathName, hideHeader);

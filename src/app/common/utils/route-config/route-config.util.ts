export class RouteConfig<p = void, q = void> {
  public pathFromRoot: string;

  get pathAfterRoot() {
    return this.pathFromRoot.replace(/^\//, '')
  }

  constructor(public path: string, public parent?: RouteConfig<any, any>) {
    this.pathFromRoot = RouteConfig.getPathUntilRoot(this);
  }

  static getPathUntilRoot(node: RouteConfig<any, any>): string {
    let root = node;
    let path = node.path;

    while (root.parent) {
      root = root.parent;
      path = `${root.path}/${path}`;
    }
    return `/${path.replace(/^\//, '')}`.replace(/\/$/, '');
  }

  url(params?: p, queryParams?: q): string {
    let pathFromRoot = this.pathFromRoot;

    if (params) {
      Object.keys(params).forEach((param) => {
        if (pathFromRoot.includes(`:${param}`)) {
          const paramValue = (params as { [k: string]: any })[param];
          pathFromRoot = pathFromRoot.replace(`:${param}`, paramValue);
        }
      });
    }

    if (queryParams) {
      const queries = Object.keys(queryParams).reduce((list, query) => {
        const queryParamValue = (queryParams as { [k: string]: any })[query];
        if (queryParamValue) {
          return list
            ? `${list}&${query}=${queryParamValue}`
            : `${query}=${queryParamValue}`;
        }
        return list;
      }, '');
      pathFromRoot = `${pathFromRoot}?${queries}`;
    }
    return pathFromRoot;
  }
}

export class Pageable {

  pageIndex: any;
  pageSize: any;
  sort: string;
  order: string;

  constructor(pageIndex: any, pageSize: any, sort: string, order: string) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sort = sort;
    this.order = order;
  }
}

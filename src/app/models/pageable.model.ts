export class Pageable {

  pageIndex: any;
  pageSize: any;
  sort: string;
  order: string;
  search: string;

  constructor(pageIndex: any, pageSize: any, sort: string, order: string, search?: string) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sort = sort;
    this.order = order;
    this.search = search;
  }
}

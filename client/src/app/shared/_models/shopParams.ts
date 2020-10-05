export class ShopParams {
  brandId = 0;
  typeId = 0;
  sort = 'name';
  pageNumber = 1;
  pageSize = 6;
  count = 0;
  search = '';

  currentPageLo(): number {
    return ((this.pageNumber - 1) * this.pageSize) + 1;
  }

  currentPageHi(): number {
    return Math.min(this.count,
      this.pageNumber * this.pageSize);
  }
}

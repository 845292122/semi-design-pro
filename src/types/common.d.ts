declare namespace CommonType {
  type PageParam = {
    pageNo: number
    pageSize: number
  }

  type PageResult<T> = {
    records: T[]
    total: number
  }
}

import { Query, SortOrder } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }
  search(searableFields: string[]) {
    const searchTerm = this.query.search ? this.query?.search : '';
    const serachableQueryOptions = searableFields.map((field) => {
      return {
        [field]: { $regex: searchTerm, $options: 'i' },
      };
    });
    this.queryModel = this.queryModel.find({ $or: serachableQueryOptions });
    return this;
  }
  filter() {
    const filterQuery = this.query?.filter
      ? { author: this.query?.filter }
      : {};
    this.queryModel = this.queryModel.find(filterQuery);
    return this;
  }
  sort() {
    const sortBy = this.query?.sortBy && this.query?.sortBy;

    const sortOrder = this.query?.sortOrder && this.query?.sortOrder;
    if (
      (sortBy === 'createdAt' || sortBy === 'title') &&
      (sortOrder === 'asc' || sortOrder === 'desc')
    ) {
      this.queryModel = this.queryModel.sort([
        [sortBy as string, sortOrder as SortOrder],
      ]);
    }
    return this;
  }
}
export default QueryBuilder;

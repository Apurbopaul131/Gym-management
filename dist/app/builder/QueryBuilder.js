"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    search(searableFields) {
        var _a;
        const searchTerm = this.query.search ? (_a = this.query) === null || _a === void 0 ? void 0 : _a.search : '';
        const serachableQueryOptions = searableFields.map((field) => {
            return {
                [field]: { $regex: searchTerm, $options: 'i' },
            };
        });
        this.queryModel = this.queryModel.find({ $or: serachableQueryOptions });
        return this;
    }
    filter() {
        var _a, _b;
        const filterQuery = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.filter)
            ? { author: (_b = this.query) === null || _b === void 0 ? void 0 : _b.filter }
            : {};
        this.queryModel = this.queryModel.find(filterQuery);
        return this;
    }
    sort() {
        var _a, _b, _c, _d;
        const sortBy = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) && ((_b = this.query) === null || _b === void 0 ? void 0 : _b.sortBy);
        const sortOrder = ((_c = this.query) === null || _c === void 0 ? void 0 : _c.sortOrder) && ((_d = this.query) === null || _d === void 0 ? void 0 : _d.sortOrder);
        if ((sortBy === 'createdAt' || sortBy === 'title') &&
            (sortOrder === 'asc' || sortOrder === 'desc')) {
            this.queryModel = this.queryModel.sort([
                [sortBy, sortOrder],
            ]);
        }
        return this;
    }
}
exports.default = QueryBuilder;

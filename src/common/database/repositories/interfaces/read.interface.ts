import {
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
} from 'typeorm';

export interface IRead<T> {
    find(orderOptions?: FindOptionsOrder<T>): Promise<T[]>;

    findOne(
        whereOption: FindManyOptions<T>,
        selectOption: FindOptionsSelect<T>,
        relationOption?: FindOptionsRelations<T>
    ): Promise<T>;
    whereIn(whereOption: FindManyOptions<T>): Promise<T[]>;
}

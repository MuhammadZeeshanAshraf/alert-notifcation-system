import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IRead } from '../interfaces/read.interface';
import { IWrite } from '../interfaces/write.interface';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  constructor(public repository: Repository<T>) {}

  async whereIn(whereOption: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({
      select: {},
      where: whereOption.where,
    });
  }
  async findOne(
    whereOption: FindManyOptions<T>,
    selectOption: FindOptionsSelect<T> = {},
    relationOption?: FindOptionsRelations<T>,
  ): Promise<T> {
    return this.repository.findOne({
      select: selectOption,
      where: whereOption.where,
      relations: relationOption,
    });
  }

  create(item: T): Promise<T> {
    return this.repository.save(this.repository.create(item));
  }

  bulkCreate(item: T[]): Promise<T[]> {
    return this.repository.save(this.repository.create(item));
  }

  async update(
    conditions: FindOptionsWhere<T>,
    updates: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    await this.repository.update(conditions, updates);
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async find(
    whereOptions?: FindManyOptions<T>,
    orderOptions?: FindOptionsOrder<T>,
  ): Promise<T[]> {
    return this.repository.find({
      where: whereOptions.where,
      order: orderOptions,
    });
  }
}

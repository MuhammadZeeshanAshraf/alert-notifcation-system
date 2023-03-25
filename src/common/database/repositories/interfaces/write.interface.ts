import { FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IWrite<T> {
    create(item: T): Promise<T>;
    bulkCreate(item: T[]): Promise<T[]> 
    update(conditions: FindOptionsWhere<T>, updates: QueryDeepPartialEntity<T>): Promise<void>;
    delete(id: string): Promise<boolean>;
  }
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { User } from '../../entities/user.entity';

export interface IUserRepository
    extends BaseRepository<User> {
}

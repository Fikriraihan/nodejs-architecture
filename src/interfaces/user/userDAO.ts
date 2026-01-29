import { AuthUser, User } from '../../entities/index.js';
import type IPaginated from '../paginated.js';

export default interface IUserDAO {
    listUsers(filters: Partial<User>, page: number, perPage: number): Promise<IPaginated<User>>
    findOneBy(filters: Partial<User>): Promise<User | null>
    findForAuth(email: string): Promise<AuthUser | null>
    create(payload: Partial<User>): Promise<User>
    update(id: number, payload: Partial<User>): Promise<boolean>
    delete(id: number): Promise<boolean>
}
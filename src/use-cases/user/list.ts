import { User } from '../../entities/index.js';
import { IPaginated, IUseCase } from '../../interfaces/index.js';
import { IUserDAO } from '../../interfaces/user.js';

export default class ListUsers implements IUseCase<IPaginated<User>> {
    constructor(protected userDAO: IUserDAO) { }

    async call(page: number = 1, perPage: number = 10): Promise<IPaginated<User>> {
        return this.userDAO.listUsers({}, page, perPage)
    }
}
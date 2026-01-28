import { IUseCase } from '../../interfaces/index.js';
import { IUserDAO } from '../../interfaces/user.js';

export default class DeleteUser implements IUseCase<boolean> {
    constructor(protected userDAO: IUserDAO) { }
    
    async call(id: number): Promise<boolean> {
        return this.userDAO.delete(id)
    }
}
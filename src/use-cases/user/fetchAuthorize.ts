import { User } from '../../entities/index.js';
import { IUseCase } from '../../interfaces/index.js';
import { IUserDAO } from '../../interfaces/user.js';

export default class FetchAuthorizedUser implements IUseCase<User | null> {
    constructor(
        protected userDAO: IUserDAO,
        protected verifyToken: (token: string) => User,
    ) { }
    
    async call(token: string): Promise<User | null> {
        if (!token) {
            return null
        }

        try {
            const { id } = this.verifyToken(token)
            const user = await this.userDAO.findOneBy({ id })
            return user
        } catch (error) {
            return null
        }
    }
}
import { User } from '../../entities/index.js'
import { IUserDAO } from '../../interfaces/user.js'
import { IUseCase } from '../../interfaces/index.js'
import { UnauthorizedError } from '../../errors/index.js'

export default class AuthorizeUser implements IUseCase<User> {
    constructor(
        protected userDAO: IUserDAO,
        protected verifyToken: (token: string) => User,
    ) { }
    
    async call(token: string): Promise<User> {
        if (!token) {
            throw new UnauthorizedError('You`re not authorized')
        }

        const { id } = this.verifyToken(token);
        const user = await this.userDAO.findOneBy({ id })
        if (!user) {
            throw new UnauthorizedError('You`re not authorized')
        }

        return user
    }
}
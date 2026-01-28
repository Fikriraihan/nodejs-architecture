import { AuthUser, User } from '../../entities/index.js';
import { IUserDAO } from '../../interfaces/user.js';
import { IUseCase, IValidator } from '../../interfaces/index.js';
import { ValidationError } from '../../errors/index.js';

export default class CreateUser implements IUseCase<User> {
    constructor(
        protected validator: IValidator<AuthUser>,
        protected userDAO: IUserDAO,
        protected encryptPassword: (password: string) => Promise<{ password: string, salt: string }>
    ) { }
    
    async call(
        payload: Pick<AuthUser, 'email' | 'firstName' | 'lastName' | 'role' | 'password'>,
    ): Promise<User> {
        const { data, errors } = this.validator.validate(payload);
        if (errors && errors.length > 0) {
            throw new ValidationError('The data is invalid', errors)
        }
        const { password, salt } = await this.encryptPassword(data.password);
        Object.assign(data, {
            password,
            salt
        })
        return this.userDAO.create(data)
    }
}
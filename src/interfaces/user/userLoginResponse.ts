import { User } from '../../entities/index.js';

export default interface ILoginResponse {
    user: Partial<User>
    token: string
}
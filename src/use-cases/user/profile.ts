import { User } from '../../entities/index.js';
import { NotFoundError } from '../../errors/index.js';
import { IUseCase } from '../../interfaces/index.js';
import { IArticleDAO } from '../../interfaces/article.js';
import { IUserDAO } from '../../interfaces/user.js';

export default class UserProfile implements IUseCase<User> {
    constructor(
        protected userDAO: IUserDAO,
        protected articleDAO: IArticleDAO,
    ) { }
    
    async call(id: number, articlesPage?: number, articlesPerPage?: number): Promise<User> {
        const user = await this.userDAO.findOneBy({ id })
        if (!user) {
            throw new NotFoundError('User was not found')
        }
        const articles = await this.articleDAO.userPublishedArticles(
            user.id,
            articlesPage,
            articlesPerPage,
        )
        Object.assign(user, { articles })
        return user
    }
}
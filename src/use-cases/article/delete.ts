import { User } from '../../entities/index.js';
import { IUseCase } from '../../interfaces/index.js';
import { IArticleDAO } from '../../interfaces/article.js';

export default class DeleteArticle implements IUseCase<boolean> {
    constructor(
        protected articleDAO: IArticleDAO,
    ) { }
    
    async call(id: number, user: Pick<User, 'id' | 'role'>): Promise<boolean> {
        if (user.role === 'admin') {
            return this.articleDAO.delete(id)
        }
        return this.articleDAO.delete(id, user.id)
    }
}
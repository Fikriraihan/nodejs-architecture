import { Article } from '../../entities/index.js';
import { NotFoundError } from '../../errors/index.js';
import { IUseCase } from '../../interfaces/index.js';
import { IArticleDAO } from '../../interfaces/article.js';

export default class ViewArticle implements IUseCase<Article> {
    constructor(protected articleDAO: IArticleDAO) { }
    
    async call(id: number, userID?: string): Promise<Article> {
        const article = await this.articleDAO.findOne(id)
        if (!article || (!article.isPublished && article.authorID !== userID && !!article.authorID)) {
            throw new NotFoundError('Article was not found')
        }
        return article
    }
}
import { Article } from '../../entities/index.js';
import { IUseCase } from '../../interfaces/index.js';
import { IArticleDAO } from '../../interfaces/article.js';

export default class UserArticlesList implements IUseCase<Pick<Article, 'id' | 'title' | 'description' | 'isPublished'>[]> {
    constructor(
        protected articleDAO: IArticleDAO
    ) { }
    
    async call(
        userID: number,
        publishedOnly: boolean = true,
        page?: number,
        perPage?: number
    ): Promise<Pick<Article, 'id' | 'title' | 'description' | 'isPublished'>[]> {
        return publishedOnly
            ? await this.articleDAO.userPublishedArticles(userID, page, perPage)
            : await this.articleDAO.userAllArticles(userID, page, perPage)
            
    }
}
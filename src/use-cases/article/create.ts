import { Article, User } from '../../entities/index.js';
import { ValidationError } from '../../errors/validationError.js';
import type IValidator from '../../interfaces/validator.js';
import type IUseCase from '../../interfaces/useCase.js';
import type IArticleDAO from '../../interfaces/article/articleDAO.js';

export default class CreateArticle implements IUseCase<Article> {
    constructor(
        protected validator: IValidator<Article>,
        protected articleDAO: IArticleDAO,
    ) { }
    
    async call(
        user: User,
        payload: Pick<Article, 'title' | 'description' | 'content' | 'isPublished'>
    ): Promise<Article> {
        const { data, errors } = this.validator.validate(payload);
        if (errors && errors.length > 0) {
            throw new ValidationError('The data is invalid', errors)
        }
        const article = new Article(data)
        Object.assign(article, {
            authorID: user.id,
            isPublished: data.isPublished || false
        })
        return this.articleDAO.create(article)
    }
}
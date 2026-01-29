import Entity from './entity.js';
import User from './user.js';

export default class Article extends Entity<Article> {
    id!: number;
    isPublished!: boolean;
    title!: string;
    description?: string;
    content!: string;
    author?: User;
    authorID!: number;
}
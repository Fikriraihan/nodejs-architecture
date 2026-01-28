import Article from "./articles.js";
import Entity from "./entity.js";

export default class User extends Entity<User> {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: 'user' | 'admin';
    articles?: Article[];
}

const user = new User({id: 1, firstName: 'John', lastName: 'Doe', email: 'j@j.com', role: 'admin'});
console.log(user);
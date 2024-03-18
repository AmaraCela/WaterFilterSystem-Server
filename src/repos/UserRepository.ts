import { IUserRepository } from './IUserRepository';
import { User } from "../models/User";
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async exists(user: User): Promise<boolean> {
        const userExists = await this.models.User.findOne({
            where: {
                email: user.email
            }
        });

        return !!userExists;
    }

    async delete(user: User): Promise<any> {
        return await this.models.User.destroy({
            where: {
                user_id: user.id
            }
        });
    }

    async save(user: User): Promise<any> {
        const userObj = await this.models.User.findOne({
            where: {
                email: user.email
            }
        });

        const userData = UserMapper.toPersistence(user);
        if (userObj != null) {
            return await userObj.update(userData);
        } else {
            return await this.models.User.create(userData);
        }
    }

    async findUserById(id: number): Promise<User> {
        return await this.models.User.findOne({
            where: {
                user_id: id
            }
        });
    }
}
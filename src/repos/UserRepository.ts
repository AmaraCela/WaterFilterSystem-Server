import { User } from "../models/User";
import { UserMapper } from '../mappers/UserMapper';
import bcrypt from "bcryptjs";

export class UserRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<User[]> {
        const users = await this.models.User.findAll();
        return users.map(UserMapper.toDomain);
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
        // fsr cascade doesn't work if you do User.destroy directly
        const userFound = await this.models.User.findOne({
            where: {
                user_id: user.id
            }
        });

        return await userFound.destroy();
    }

    async save(user: User): Promise<User> {
        let userObj = await this.models.User.findOne({
            where: {
                user_id: user.id
            }
        });

        if (userObj != null) {
            userObj = await userObj.update(UserMapper.toPersistence(user));
        } else {
            userObj = await this.models.User.create(UserMapper.toPersistence(user));
        }
        
        return UserMapper.toDomain(userObj);
    }

    async findUserById(id: number): Promise<User> {
        const userObj = await this.models.User.findOne({
            where: {
                user_id: id
            }
        });

        return UserMapper.toDomain(userObj);
    }
}
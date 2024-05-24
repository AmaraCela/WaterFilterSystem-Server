import { MarketingManager } from '../models/MarketingManager';
import { MarketingManagerMapper } from '../mappers/MarketingManagerMapper';
import { UserRole } from '../enums/UserRole';

export class MarketingManagerRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<MarketingManager[]> {
        const users = await this.models.MarketingManager.findAll({
            include: [
                this.models.User
            ]
        });

        const managerModels = users.map(MarketingManagerMapper.toDomain);
        return managerModels;
    }
    
    async findManagerById(id: number): Promise<MarketingManager> {
        const user = await this.models.MarketingManager.findOne({
            where: {
                manager_id: id
            },
            include: [
                this.models.User
            ]
        });

        return MarketingManagerMapper.toDomain(user);
    }

    async exists(manager: MarketingManager): Promise<boolean> {
        const userExists = await this.models.User.findOne({
            where: {
                email: manager.email,
                role: UserRole[UserRole.MARKETING_MANAGER]
            }
        });

        return !!userExists;
    }

    async delete(user: MarketingManager): Promise<any> {
        const userFound = await this.models.MarketingManager.findOne({
            where: {
                user_id: user.id
            }
        });

        return await userFound.destroy();
    }


    async save(manager: MarketingManager): Promise<any> {
        let userObj = await this.models.MarketingManager.findOne({
            where: {
                manager_id: manager.id
            }
        });

        if (userObj != null) {
            userObj = await userObj.update(MarketingManagerMapper.toPersistence(manager));
        } else {
            userObj = await this.models.MarketingManager.create(MarketingManagerMapper.toPersistence(manager));
        }

        return userObj;
        // return MarketingManagerMapper.toDomain(userObj);
    }
}
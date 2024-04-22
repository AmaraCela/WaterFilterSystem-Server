import { ChiefOfOperations } from '../models/ChiefOfOperations';
import { ChiefOfOperationsMapper } from '../mappers/ChiefOfOperationsMapper';
import { UserRole } from '../enums/UserRole';

export class ChiefOfOperationsRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<ChiefOfOperations[]> {
        const users = await this.models.ChiefOfOperations.findAll({
            include: [
                this.models.User
            ]
        });

        const chiefModels = users.map(ChiefOfOperationsMapper.toDomain);
        return chiefModels;
    }
    
    async findChiefById(id: number): Promise<ChiefOfOperations> {
        const user = await this.models.ChiefOfOperations.findOne({
            where: {
                chief_id: id
            },
            include: [
                this.models.User
            ]
        });

        return ChiefOfOperationsMapper.toDomain(user);
    }

    async exists(chief: ChiefOfOperations): Promise<boolean> {
        const userExists = await this.models.User.findOne({
            where: {
                email: chief.email,
                role: UserRole[UserRole.CHIEF_OF_OPERATIONS]
            }
        });

        return !!userExists;
    }

    async delete(user: ChiefOfOperations): Promise<any> {
        const userFound = await this.models.ChiefOfOperations.findOne({
            where: {
                user_id: user.id
            }
        });

        return await userFound.destroy();
    }


    async save(chief: ChiefOfOperations): Promise<any> {
        let userObj = await this.models.ChiefOfOperations.findOne({
            where: {
                chief_id: chief.id
            }
        });

        if (userObj != null) {
            userObj = await userObj.update(ChiefOfOperationsMapper.toPersistence(chief));
        } else {
            userObj = await this.models.ChiefOfOperations.create(ChiefOfOperationsMapper.toPersistence(chief));
        }

        return ChiefOfOperationsMapper.toDomain(userObj);
    }
}
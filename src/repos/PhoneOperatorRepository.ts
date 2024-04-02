import { PhoneOperator } from '../models/PhoneOperator';
import { PhoneOperatorMapper } from '../mappers/PhoneOperatorMapper';
import { UserRole } from '../enums/UserRole';

export class PhoneOperatorRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<PhoneOperator[]> {
        const users = await this.models.User.findAll({
            where: {
                role: UserRole[UserRole.PHONE_OPERATOR]
            }
        });

        const operatorModels = users.map(PhoneOperatorMapper.toDomain);
        const operators = await this.models.PhoneOperator.findAll();
        // TODO operator specific fields
        // ...
        return operatorModels;
    }
    
    async exists(operator: PhoneOperator): Promise<boolean> {
        const userExists = await this.models.User.findOne({
            where: {
                email: operator.email,
                role: UserRole[UserRole.PHONE_OPERATOR]
            }
        });

        return !!userExists;
    }

    async delete(user: PhoneOperator): Promise<any> {
        const userFound = await this.models.PhoneOperator.findOne({
            where: {
                user_id: user.id
            }
        });

        return await userFound.destroy();
    }


    async save(operator: PhoneOperator): Promise<any> {
        const userObj = await this.models.PhoneOperator.findOne({
            where: {
                operator_id: operator.id
            }
        });

        if (userObj != null) {
            return await userObj.update(PhoneOperatorMapper.toPersistence(operator));
        } else {
            return await this.models.PhoneOperator.create(PhoneOperatorMapper.toPersistence(operator));
        }
    }
}
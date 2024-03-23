import { PhoneOperator } from '../models/PhoneOperator';
import { PhoneOperatorMapper } from '../mappers/PhoneOperatorMapper';
import { UserRole } from '../enums/UserRole';
// import bcrypt from "bcryptjs";

export class PhoneOperatorRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<PhoneOperator[]> {
        return await this.models.PhoneOperator.findAll();
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
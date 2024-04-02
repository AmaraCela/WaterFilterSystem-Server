import { PhoneOperatorDTO } from '../dtos/PhoneOperatorDTO';
import { PhoneOperator } from '../models/PhoneOperator';

export class PhoneOperatorMapper {
    public static toDTO(phoneOperator: PhoneOperator): PhoneOperatorDTO {
        return {
            id: phoneOperator.id,
            name: phoneOperator.name,
            surname: phoneOperator.surname,
            email: phoneOperator.email,
            calls: phoneOperator.calls,
            callHistory: [] // TODO
        };
    }

    public static toPersistence(phoneOperator: PhoneOperator): any {
        return {
            operator_id: phoneOperator.id,
            name: phoneOperator.name,
            surname: phoneOperator.surname,
            email: phoneOperator.email,
            passwordHash: phoneOperator.passwordHash
        };
    }

    public static toDomain(user: any): PhoneOperator {
        if (!user) {
            return user;
        }

        const operator = new PhoneOperator(user.name, user.surname, user.email, user.passwordHash);
        operator.id = user.user_id;

        return operator;
    }
}
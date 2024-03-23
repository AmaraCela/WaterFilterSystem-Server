import { PhoneOperatorDTO } from '../dtos/PhoneOperatorDTO';
import { UserRole } from '../enums/UserRole';
import { PhoneOperator } from '../models/PhoneOperator';
import { User } from '../models/User';

export class PhoneOperatorMapper {
    public static toDTO(phoneOperator: PhoneOperator): PhoneOperatorDTO {
        return {
            id: phoneOperator.id,
            name: phoneOperator.name,
            surname: phoneOperator.surname,
            email: phoneOperator.email,
            role: UserRole[phoneOperator.role],
            calls: phoneOperator.calls.map(call => call.id)
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
}
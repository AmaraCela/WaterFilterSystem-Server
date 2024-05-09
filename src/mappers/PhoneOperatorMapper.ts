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
            callHistory: phoneOperator.callHistory
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

        const operator = new PhoneOperator(user.User.name, user.User.surname, user.User.email, user.User.passwordHash);
        operator.id = user.operator_id;
        operator.calls = user.Calls.map((call: any) => call.call_id).filter((call: any) => !call.completed);
        operator.callHistory = user.Calls.map((call: any) => call.call_id).filter((call: any) => call.completed);

        return operator;
    }
}
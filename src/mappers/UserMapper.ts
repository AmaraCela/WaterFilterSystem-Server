import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';
import { UserRole } from '../enums/UserRole';
import { PhoneOperator } from '../models/PhoneOperator';
import { PhoneOperatorMapper } from './PhoneOperatorMapper';
import { SalesAgent } from '../models/SalesAgent';

export class UserMapper {
    public static toDTO(user: User): UserDTO {
        switch (user.role) {
            case UserRole.PHONE_OPERATOR:
                const phoneOperatorDTO = PhoneOperatorMapper.toDTO(<PhoneOperator>user);
                return {
                    ...phoneOperatorDTO,
                    role: UserRole[user.role]
                };
            default:
                return {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: UserRole[user.role]
                };
        }
    }

    public static toPersistence(user: User): any {
        return {
            name: user.name,
            surname: user.surname,
            email: user.email,
            passwordHash: user.passwordHash,
            role: UserRole[user.role]
        };
    }

    public static toDomain(user: any): User {
        if (!user) {
            return user;
        }

        let userModel: User;
        
        user.role = UserRole[user.role];
        switch (user.role) {
            case UserRole.PHONE_OPERATOR:
                userModel = new PhoneOperator(user.name, user.surname, user.email, user.passwordHash);
                break;
            case UserRole.SALES_AGENT:
                userModel = new SalesAgent(user.name, user.surname, user.email, user.passwordHash);
                break;
            default:
                throw new Error("Invalid user role");
        }

        userModel.id = user.user_id;

        return userModel;
    }
}
import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';

export class UserMapper {
    public static toDTO(user: User): UserDTO {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role.toString()
        };
    }

    public static toPersistence(user: User): any {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role
        };
    }

    // non abstract classes can also have toDomain()
}
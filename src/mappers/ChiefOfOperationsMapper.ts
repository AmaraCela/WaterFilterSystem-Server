import { ChiefOfOperationsDTO } from '../dtos/ChiefOfOperationsDTO';
import { ChiefOfOperations } from '../models/ChiefOfOperations';
import { UserMapper } from './UserMapper';

export class ChiefOfOperationsMapper {
    public static toDTO(marketingManager: ChiefOfOperations): ChiefOfOperationsDTO {
        return {
            id: marketingManager.id,
            name: marketingManager.name,
            surname: marketingManager.surname,
            email: marketingManager.email
        };
    }

    public static toPersistence(marketingManager: ChiefOfOperations): any {
        return {
            chief_id: marketingManager.id,
            name: marketingManager.name,
            surname: marketingManager.surname,
            email: marketingManager.email,
            passwordHash: marketingManager.passwordHash
        };
    }

    public static toDomain(user: any): ChiefOfOperations {
        if (!user) {
            return user;
        }

        const chief = new ChiefOfOperations(user.User.name, user.User.surname, user.User.email, user.User.passwordHash);
        chief.id = user.chief_id;

        return chief;
    }
}
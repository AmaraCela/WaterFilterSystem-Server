import { MarketingManagerDTO } from '../dtos/MarketingManagerDTO';
import { MarketingManager } from '../models/MarketingManager';
import { UserMapper } from './UserMapper';

export class MarketingManagerMapper {
    public static toDTO(marketingManager: MarketingManager): MarketingManagerDTO {
        return {
            id: marketingManager.id,
            name: marketingManager.name,
            surname: marketingManager.surname,
            email: marketingManager.email
        };
    }

    public static toPersistence(marketingManager: MarketingManager): any {
        return {
            manager_id: marketingManager.id,
            name: marketingManager.name,
            surname: marketingManager.surname,
            email: marketingManager.email,
            passwordHash: marketingManager.passwordHash
        };
    }

    public static toDomain(user: any): MarketingManager {
        if (!user) {
            return user;
        }

        const manager = new MarketingManager(user.User.name, user.User.surname, user.User.email, user.User.passwordHash);
        manager.id = user.manager_id;

        return manager;
    }
}
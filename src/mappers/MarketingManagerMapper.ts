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

        const manager = new MarketingManager(user.name, user.surname, user.email, user.passwordHash);
        manager.id = user.user_id;

        return manager;
    }
}
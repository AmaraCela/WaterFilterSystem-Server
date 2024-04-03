import { SalesAgentDTO } from '../dtos/SalesAgentDTO';
import { SalesAgent } from '../models/SalesAgent';

export class SalesAgentMapper {
    public static toDTO(salesAgent: SalesAgent): SalesAgentDTO {
        return {
            id: salesAgent.id,
            name: salesAgent.name,
            surname: salesAgent.surname,
            email: salesAgent.email
        };
    }

    public static toPersistence(salesAgent: SalesAgent): any {
        return {
            agent_id: salesAgent.id,
            name: salesAgent.name,
            surname: salesAgent.surname,
            email: salesAgent.email,
            passwordHash: salesAgent.passwordHash
        };
    }

    public static toDomain(user: any): SalesAgent {
        if (!user) {
            return user;
        }

        const agent = new SalesAgent(user.User.name, user.User.surname, user.User.email, user.User.passwordHash);
        agent.id = user.agent_id;

        return agent;
    }
}
import { SalesAgent } from '../models/SalesAgent';
import { SalesAgentMapper } from '../mappers/SalesAgentMapper';
import { UserRole } from '../enums/UserRole';

export class SalesAgentRepository {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }

    async getAll(): Promise<SalesAgent[]> {
        const users = await this.models.SalesAgent.findAll({
            include: [
                this.models.User, 
                this.models.AgentSchedule
            ]
        });

        const agentModels = users.map(SalesAgentMapper.toDomain);
        return agentModels;
    }

    async findAgentById(id: number): Promise<SalesAgent> {
        const user = await this.models.SalesAgent.findOne({
            where: {
                agent_id: id
            },
            include: [
                this.models.User, 
                this.models.AgentSchedule
            ]
        });

        return SalesAgentMapper.toDomain(user);
    }
    
    async exists(agent: SalesAgent): Promise<boolean> {
        const userExists = await this.models.User.findOne({
            where: {
                email: agent.email,
                role: UserRole[UserRole.SALES_AGENT]
            }
        });

        return !!userExists;
    }

    async delete(user: SalesAgent): Promise<any> {
        const userFound = await this.models.SalesAgent.findOne({
            where: {
                user_id: user.id
            }
        });

        return await userFound.destroy();
    }


    async save(agent: SalesAgent): Promise<any> {
        const userObj = await this.models.SalesAgent.findOne({
            where: {
                agent_id: agent.id
            }
        });

        if (userObj != null) {
            return await userObj.update(SalesAgentMapper.toPersistence(agent));
        } else {
            return await this.models.SalesAgent.create(SalesAgentMapper.toPersistence(agent));
        }
    }
}
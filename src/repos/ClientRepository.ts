import { ClientStatus } from "../enums/ClientStatus";
import { ClientMapper } from "../mappers/ClientMapper";
import { Client } from "../models/Client";
import { Repository } from "./Repository";

export class ClientRepository implements Repository<Client> {
    private models: any;

    constructor (models: any) {
        this.models = models;
    }
    
    async getAll(): Promise<Client[]> {
        const clients = await this.models.Client.findAll();
        return clients.map(ClientMapper.toDomain);
    }

    async getRedListClients(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                status: ClientStatus[ClientStatus.IN_REDLIST]
            }
        });

        return clients.map(ClientMapper.toDomain);
    }
    
    async getWaitListClients(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                status: ClientStatus[ClientStatus.IN_WAITLIST]
            }
        });
        return clients.map(ClientMapper.toDomain);
    }

    async exists(client: Client): Promise<boolean> {
        const clientExists = await this.models.Client.findOne({
            where: {
                client_id: client.id
            }
        });

        return !!clientExists;
    }
    
    async delete(client: Client): Promise<any> {
        // fsr cascade doesn't work if you do Client.destroy directly
        const clientFound = await this.models.Client.findOne({
            where: {
                client_id: client.id
            }
        });

        return await clientFound.destroy();
    }

    async save(client: Client): Promise<any> {
        let clientObj = await this.models.Client.findOne({
            where: {
                client_id: client.id
            }
        });
        
        if (clientObj != null) {
            clientObj = await clientObj.update(ClientMapper.toPersistence(client));
        } else {
            clientObj = await this.models.Client.create(ClientMapper.toPersistence(client));
        }

        return ClientMapper.toDomain(clientObj);
    }

    async findClientById(id: number): Promise<Client> {
        const clientObj = await this.models.Client.findOne({
            where: {
                client_id: id
            }
        });

        return ClientMapper.toDomain(clientObj);
    }
}
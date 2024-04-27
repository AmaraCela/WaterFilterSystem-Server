import { ClientStatus } from "../enums/ClientStatus";
import { ClientMapper } from "../mappers/ClientMapper";
import { Client } from "../models/Client";
import { Repository } from "./Repository";
import { Op, where } from "sequelize";

export class ClientRepository implements Repository<Client> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
        });
        return clients.map(ClientMapper.toDomain);
    }

    async getRedListClients(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                status: ClientStatus[ClientStatus.IN_REDLIST]
            },
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
        });

        return clients.map(ClientMapper.toDomain);
    }

    async getWaitListClients(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                status: ClientStatus[ClientStatus.IN_WAITLIST]
            },
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
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
            },
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
        });

        return ClientMapper.toDomain(clientObj);
    }

    async findBuyers(): Promise<Client[]> {
        const buyers = await this.models.Client.findAll({
            where: {
                hasMadePurchase: 1,
            },
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
        });
        return buyers.map(ClientMapper.toDomain);
    }

    async findClientsByName(name: string): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${name}%` } },
                    { surname: { [Op.like]: `%${name}%` } }
                ]
            },
            include: [{
                model: this.models.Client,
                as: "Referrals"
            }]
        });
        return clients.map(ClientMapper.toDomain);
    }

    async findReferences() {
        const references = await this.models.Client.findAll({
            where: {
                referredBy: { [Op.ne]: null }
            },
            include: {
                model: this.models.Client,
                as: 'ReferredBy',
                attributes: [['client_id', 'id'], 'name', 'surname']
            }
        });
        return references;
        return references.map(ClientMapper.toDomain);
    }

}
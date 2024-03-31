import { ClientStatus } from "../enums/ClientStatus";
import { Client } from "../models/Client";

export class ClientRepository {
    private models: any;
    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Client> {
        const clients = await this.models.Client.findAll();
        return clients;
    }

    async getRedListClients(): Promise<Client[]> {
        const clients = await this.models.Client.findAll({
            where: {
                status: "IN_REDLIST"
            }
        });
        return clients;
    }

    async save(client: Client): Promise<any> {
        return await this.models.Client.create(client);
    }

}
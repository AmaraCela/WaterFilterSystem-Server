import { ClientStatus } from "../enums/ClientStatus";
import { Client } from "../models/Client";
import { ClientDTO } from "../dtos/ClientDTO";

export class ClientMapper {
    public static toDTO(client: Client): ClientDTO {
        return {
            id: client.id,
            name: client.name,
            surname: client.surname,
            phoneNo: client.phoneNo,
            address: client.address,
            profession: client.profession,
            hasMadePurchase: client.hasMadePurchase,
            lastCallDate: client.lastCallDate ? client.lastCallDate.toISOString() : null,
            nextContactDate: client.nextContactDate ? client.nextContactDate.toISOString() : null,
            referrals: client.referrals,
            referredBy: client.referredBy ? client.referredBy.id : null,
            status: ClientStatus[client.status],
            assignedOperator: client.assignedOperator,
            referredInSale: client.referredInSale,
            createdAt: client.createdAt,

        };
    }

    public static toPersistence(client: Client): any {
        return {
            name: client.name,
            surname: client.surname,
            phoneNo: client.phoneNo,
            address: client.address,
            profession: client.profession,
            hasMadePurchase: client.hasMadePurchase,
            lastCallDate: client.lastCallDate ? client.lastCallDate.toISOString() : null,
            nextContactDate: client.nextContactDate ? client.nextContactDate.toISOString() : null,
            referredBy: client.referredBy ? client.referredBy.id : null,
            status: ClientStatus[client.status],
            assignedOperator: client.assignedOperator,
            referredInSale: client.referredInSale,
        };
    }

    public static toDomain(client: any): Client {
        if (!client) {
            return client;
        }

        const clientModel = new Client(
            client.name,
            client.surname,
            client.phoneNo,
            client.address,
            client.profession,
            client.hasMadePurchase,
            new Date(client.lastCallDate),
            new Date(client.nextContactDate),
            client.referrals,
            ClientStatus[<string>client.status as keyof typeof ClientStatus],
            client.referredBy,
            client.assignedOperator,
            client.referredInSale,
            
        );
        clientModel.id = client.client_id;
        clientModel.createdAt = client.createdAt;

        
        return clientModel;
    }
}
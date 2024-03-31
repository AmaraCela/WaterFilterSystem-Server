import { Client } from "../models/Client";

export class ClientMapper {
    public static toDTO(client: Client) {
        return {
            id: client.clientId,
            name: client.name, 
            surname: client.surname,
            phoneNo: client.phoneNo,
            address: client.address,
            profession: client.profession,
            hasMadePurchase: client.hasMadePurchase,
            lastCallDate: client.lastCallDate,
            nextConstactDate: client.nextContactDate,
            status: client.status,
            assignedOperator: client.assignedOperator,
            referredBy: client.referredBy,
            referredInSale: client.referredInSale,
        }
    }
}
import { Sale } from "../models/Sale";
import { SaleDTO } from "../dtos/SaleDTO";

export class SaleMapper {
    public static toDTO(sale: Sale): SaleDTO {
        return {
            id: sale.id,
            client: sale.client,
            salesAgent: sale.salesAgent,
            phoneOperator: sale.phoneOperator,
            time: sale.time ? sale.time.toISOString() : null,
            approved: sale.approved,
            price: sale.price,
            warrantyExpiration: sale.warrantyExpiration.toISOString(),
            renewalDate: sale.renewalDate.toISOString(),
            monthlyPayment: sale.monthlyPayment,
            referredClients: sale.referredClients
        };
    }

    public static toPersistence(sale: Sale): any {
        return {
            client: sale.client,
            salesAgent: sale.salesAgent,
            phoneOperator: sale.phoneOperator,
            approved: sale.approved,
            price: sale.price,
            warrantyExpiration: sale.warrantyExpiration.toISOString(),
            renewalDate: sale.renewalDate.toISOString(),
            monthlyPayment: sale.monthlyPayment
        };
    }

    public static toDomain(sale: any): Sale {
        if (!sale) {
            return sale;
        }

        const saleModel = new Sale(
            sale.client,
            sale.salesAgent,
            sale.phoneOperator,
            sale.price,
            new Date(sale.warrantyExpiration),
            new Date(sale.renewalDate),
            sale.monthlyPayment,
            sale.ReferredClients.map((client: any) => client.client_id),
            sale.createdAt,
            sale.approved
        );
        saleModel.id = sale.sale_id;
        
        return saleModel;
    }
}
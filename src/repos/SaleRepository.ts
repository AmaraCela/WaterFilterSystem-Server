import { where } from "sequelize";
import { SaleMapper } from "../mappers/SaleMapper";
import { Sale } from "../models/Sale";
import { Repository } from "./Repository";

export class SaleRepository implements Repository<Sale> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Sale[]> {
        const sales = await this.models.Sale.findAll({
            include: [
                this.models.Client
            ]
        });
        return sales.map(SaleMapper.toDomain);
    }

    async getOfThisMonth(): Promise<Sale[]> {
        const sales = await this.models.Sale.findAll({
            where: {
                createdAt: {
                    [this.models.Sequelize.Op.gt]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            },
            include: [
                this.models.Client
            ]
        });
        return sales.map(SaleMapper.toDomain);
    }

    async getAllOfAgent(agentid: number): Promise<Sale []>{
        const sales = await this.models.Sale.findAll({
            where: {
                salesAgent: agentid
            }, 
            include: [{
                model: this.models.Client
            }]
        });
        return sales;
        // return sales.map(SaleMapper.toDomain);
    }

    async exists(sale: Sale): Promise<boolean> {
        const saleExists = await this.models.Sale.findOne({
            where: {
                sale_id: sale.id
            }
        });

        return !!saleExists;
    }

    async delete(sale: Sale): Promise<any> {
        return await this.models.Sale.destroy({
            where: {
                sale_id: sale.id
            }
        })
    }

    async save(sale: Sale): Promise<any> {
        console.log('inside save');
        console.log(sale.id);
        let saleObj = await this.models.Sale.findOne({
            where: {
                sale_id: sale.id
            }
        });
        console.log(saleObj);
        if (saleObj != null) {
            saleObj = await saleObj.update(SaleMapper.toPersistence(sale));
        }
        else {
            saleObj = await this.models.Sale.create(SaleMapper.toPersistence(sale));
        }

        return SaleMapper.toDomain(saleObj);
    }

    async findSaleById(id: number): Promise<Sale> {
        const saleObj = await this.models.Sale.findOne({
            where: {
                sale_id: id
            },
            include: [{
                model: this.models.Client,
                as: "ReferredClients",
            }]
        });
       
        return SaleMapper.toDomain(saleObj);
    }

    async getUnapprovedSales() {
        const sales = await this.models.Sale.findAll({
            where: {
                approved: "PENDING"
            },
            include: {
                model: this.models.SalesAgent,
                include: {
                    model: this.models.User,
                }
            }
        });
        
        return sales;
    }


    async rejectSale(sale_id: number) {
        let sale = this.models.Sale.findOne({
            where: {
                sale_id
            }
        });
        sale = await sale.update(sale.approved = "REJECTED");
        return sale;
    }
}
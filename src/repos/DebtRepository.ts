import { DebtMapper } from "../mappers/DebtMapper";
import { Debt } from "../models/Debt";
import { Repository } from "./Repository";

export class DebtRepository implements Repository<Debt> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Debt[]> {
        const debts = await this.models.Debt.findAll();
        return debts.map(DebtMapper.toDomain);
    }

    async exists(debt: Debt): Promise<boolean> {
        const debtExists = await this.models.Debt.findOne({
            where: {
                sale: debt.sale
            }
        });

        return !!debtExists;
    }

    async delete(debt: Debt): Promise<any> {
        return await this.models.Debt.destroy({
            where: {
                sale: debt.sale
            }
        })
    }

    async save(debt: Debt): Promise<any> {
        let debtObj = await this.models.Debt.findOne({
            where: {
                sale: debt.sale
            }
        });

        if (debtObj != null) {
            debtObj = await debtObj.update(DebtMapper.toPersistence(debt));
        }
        else {
            debtObj = await this.models.Debt.create(DebtMapper.toPersistence(debt));
        }

        return DebtMapper.toDomain(debtObj);
    }

    async findDebtBySaleId(id: number): Promise<Debt> {
        const debtObj = await this.models.Debt.findOne({
            where: {
                sale: id
            },
        });

        return DebtMapper.toDomain(debtObj);
    }
}
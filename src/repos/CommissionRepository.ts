import { CommissionMapper } from "../mappers/CommissionMapper";
import { Commission } from "../models/Commission";
import { Repository } from "./Repository";

export class CommissionRepository implements Repository<Commission> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Commission[]> {
        const commissions = await this.models.Commission.findAll();
        return commissions.map(CommissionMapper.toDomain);
    }

    async exists(commission: Commission): Promise<boolean> {
        const commissionExists = await this.models.Commission.findOne({
            where: {
                commission_id: commission.id
            }
        });

        return !!commissionExists;
    }

    async delete(commission: Commission): Promise<any> {
        return await this.models.Commission.destroy({
            where: {
                commission_id: commission.id
            }
        })
    }

    async save(commission: Commission): Promise<any> {
        let commissionObj = await this.models.Commission.findOne({
            where: {
                commission_id: commission.id
            }
        });

        if (commissionObj != null) {
            commissionObj = await commissionObj.update(CommissionMapper.toPersistence(commission));
        }
        else {
            commissionObj = await this.models.Commission.create(CommissionMapper.toPersistence(commission));
        }

        return CommissionMapper.toDomain(commissionObj);
    }

    async findCommissionById(id: number): Promise<Commission> {
        const commissionObj = await this.models.Commission.findOne({
            where: {
                commission_id: id
            }
        });

        return CommissionMapper.toDomain(commissionObj);
    }
}
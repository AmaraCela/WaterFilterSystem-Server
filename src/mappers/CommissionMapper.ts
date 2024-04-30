import { Commission } from "../models/Commission";
import { CommissionDTO } from "../dtos/CommissionDTO";
import { CommissionType } from "../enums/CommissionType";

export class CommissionMapper {
    public static toDTO(commission: Commission): CommissionDTO {
        return {
            id: commission.id,
            amount: commission.amount,
            approved: commission.approved,
            userPaidTo: commission.userPaidTo,
            type: CommissionType[commission.type],
        };
    }

    public static toPersistence(commission: Commission): any {
        return {
            amount: commission.amount,
            approved: commission.approved,
            userPaidTo: commission.userPaidTo,
            type: CommissionType[commission.type],
        };
    }

    public static toDomain(commission: any): Commission {
        if (!commission) {
            return commission;
        }

        const commissionModel = new Commission(
            commission.userPaidTo,
            CommissionType[<string>commission.type as keyof typeof CommissionType],
            commission.amount,
            commission.approved
        );
        commissionModel.id = commission.commission_id;
        
        return commissionModel;
    }
}
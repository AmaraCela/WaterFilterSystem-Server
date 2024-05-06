import { Debt } from '../models/Debt';
import { DebtDTO } from '../dtos/DebtDTO';

export class DebtMapper {
    public static toDTO(debt: Debt): DebtDTO {
        return {
            nextPayment: debt.nextPayment.toISOString(),
            amountPaidOff: debt.amountPaidOff,
            amountToCollect: debt.amountToCollect,
            sale: debt.sale,
        };
    }

    public static toPersistence(debt: Debt): any {
        return {
            nextPayment: debt.nextPayment.toISOString(),
            amountPaidOff: debt.amountPaidOff,
            amountToCollect: debt.amountToCollect,
            sale: debt.sale
        };
    }

    public static toDomain(debt: any): Debt {
        if (!debt) {
            return debt;
        }

        const debtModel = new Debt(debt.nextPayment, debt.amountPaidOff, debt.amountToCollect, debt.sale);
        return debtModel;
    }
}
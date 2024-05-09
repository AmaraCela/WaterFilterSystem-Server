import { UserRole } from "../enums/UserRole";
import { User } from "./User";

export class InventoryManager extends User {
    constructor(name: string, surname: string, email: string, passwordHash: string) {
        super(name, surname, email, passwordHash, UserRole.INVENTORY_MANAGER);
    }
}
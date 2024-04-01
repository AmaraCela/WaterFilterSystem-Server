import { UserRole } from '../enums/UserRole';
import bcrypt from "bcryptjs";

export abstract class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    role: UserRole;

    constructor(name: string, surname: string, email: string, passwordHash: string, role: UserRole) {
        this.id = -1;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
    }
}
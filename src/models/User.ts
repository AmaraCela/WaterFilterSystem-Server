import { UserRole } from '../enums/UserRole';

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
}
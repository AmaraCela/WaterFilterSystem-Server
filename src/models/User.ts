import { UserRole } from '../enums/UserRole';

export abstract class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    role: UserRole;
}
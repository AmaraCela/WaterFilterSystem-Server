import { Repository } from "./Repository";
import { User } from "../models/User";

export interface IUserRepository extends Repository<User> {
    findUserById(id: number): Promise<User>;
    // ...
}
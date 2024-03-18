"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toDTO(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role.toString()
        };
    }
    static toPersistence(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role
        };
    }
}
exports.UserMapper = UserMapper;

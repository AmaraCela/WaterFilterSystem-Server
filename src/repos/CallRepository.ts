import { CallMapper } from "../mappers/CallMapper";
import { Call } from "../models/Call";
import { Repository } from "./Repository";

export class CallRepository implements Repository<Call> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Call[]> {
        const calls = await this.models.Call.findAll();
        return calls.map(CallMapper.toDomain);
    }

    async exists(call: Call): Promise<boolean> {
        const callExists = await this.models.Call.findOne({
            where: {
                call_id: call.id
            }
        });

        return !!callExists;
    }

    async delete(call: Call): Promise<any> {
        return await this.models.Call.destroy({
            where: {
                call_id: call.id
            }
        })
    }

    async save(call: Call): Promise<any> {
        let callObj = await this.models.Call.findOne({
            where: {
                call_id: call.id
            }
        });

        if (callObj != null) {
            callObj = await callObj.update(CallMapper.toPersistence(call));
        }
        else {
            callObj = await this.models.Call.create(CallMapper.toPersistence(call));
        }

        return CallMapper.toDomain(callObj);
    }

    async findCallById(id: number): Promise<Call> {
        const callObj = await this.models.Call.findOne({
            where: {
                call_id: id
            }
        });

        return CallMapper.toDomain(callObj);
    }
}
import { Call } from "../models/Call";
export class CallRepository {
    private models: any;
    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Call> {
        return await this.models.Call.findAll();
    }

    async save(call: Call): Promise<any> {
        return await this.models.Call.create(call);
    }
}
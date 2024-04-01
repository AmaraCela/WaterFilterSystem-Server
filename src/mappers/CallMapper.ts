import { Call } from '../models/Call';
import { CallDTO } from '../dtos/CallDTO';

export class CallMapper {
    public static toDTO(call: Call): CallDTO {
        return {
            id: call.id,
            clientId: call.client,
            phoneOperatorId: call.phoneOperator,
            scheduledTime: call.scheduledTime.toISOString(),
            outcomeComment: call.outcomeComment,
            completed: call.completed
        };
    }

    public static toPersistence(call: Call): any {
        return {
            client: call.client,
            phoneOperator: call.phoneOperator,
            scheduledTime: call.scheduledTime.toISOString(),
            outcomeComment: call.outcomeComment,
            completed: call.completed
        };
    }

    public static toDomain(call: any): Call {
        if (!call) {
            return call;
        }

        const callModel = new Call(call.client, call.phoneOperator, new Date(call.scheduledTime), call.outcomeComment, call.completed);
        callModel.id = call.call_id;

        return callModel;
    }
}
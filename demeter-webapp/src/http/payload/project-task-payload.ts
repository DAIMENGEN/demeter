import {HttpPayload} from "@D/http/http-payload.ts";
import {AnyType} from "@D/global-types";

export class ProjectTaskPayload implements HttpPayload {
    id: string;
    taskName: string;
    parentTaskId?: string;
    [key: string]: AnyType;

    constructor(id: string, taskName: string, parentTaskId?: string, extraFields?: Omit<Record<string, AnyType>, "id" | "taskName" | "parentTaskId">) {
        this.id = id;
        this.taskName = taskName;
        this.parentTaskId = parentTaskId;
        if (extraFields) {
            Object.assign(this, extraFields);
        }
    }
}
import {HttpPayload} from "@D/http/http-payload.ts";

export interface IProjectTaskEntity extends HttpPayload {
    taskName: string;
    taskType: number;
    taskStatus: number;
    startDateTime: string;
    endDateTime?: string;
    description?: string;
    taskRule?: string;
    parentId?: string;
    order?: number;
}

export class ProjectTaskEntity implements IProjectTaskEntity {
    id: string;
    taskName: string;
    taskType: number;
    taskStatus: number;
    startDateTime: string;
    endDateTime?: string;
    description?: string;
    taskRule?: string;
    parentId?: string;
    order?: number;

    constructor(
        id: string,
        taskName: string,
        taskType: number,
        taskStatus: number,
        startDateTime: string,
        endDateTime?: string,
        description?: string,
        taskRule?: string,
        parentId?: string,
        order?: number
    ) {
        this.id = id;
        this.taskName = taskName;
        this.taskType = taskType;
        this.taskStatus = taskStatus;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.description = description;
        this.taskRule = taskRule;
        this.parentId = parentId;
        this.order = order;
    }
}
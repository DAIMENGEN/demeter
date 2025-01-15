import {HttpPayload} from "@D/http/http-payload.ts";
import {JsonString} from "@D/global-types";

export class ProjectTaskAttributePayload implements HttpPayload {
    id: string;
    taskAttributeName: string;
    taskAttributeType: "int" | "text" | "date" | "json" | "bigint" | "float" | "double" | "varchar" | "boolean" | "datetime" | "longtext" | "mediumtext";
    properties?: JsonString;
    order: number;

    constructor(id: string, taskAttributeName: string, taskAttributeType: "int" | "text" | "date" | "json" | "bigint" | "float" | "double" | "varchar" | "boolean" | "datetime" | "longtext" | "mediumtext", properties?: JsonString, order?: number) {
        this.id = id;
        this.taskAttributeName = taskAttributeName;
        this.taskAttributeType = taskAttributeType;
        this.properties = properties;
        this.order= order ?? 0;
    }
}
import {ProjectTaskEntity} from "@D/core/entity/project-task-entity.ts";
import {SelectProps} from "antd";
import {HttpService} from "@D/http/http-service.ts";
import {HttpPayload} from "@D/http/http-payload.ts";
import {ProjectTaskAttributePayload} from "@D/http/payload/project-task-attribute-payload.ts";

export class ProjectTaskService extends HttpService<ProjectTaskEntity> {

    private static instance: ProjectTaskService;

    public static getInstance(): ProjectTaskService {
        if (!ProjectTaskService.instance) {
            ProjectTaskService.instance = new ProjectTaskService();
        }
        return ProjectTaskService.instance;
    }

    public create(partialFields: Omit<ProjectTaskEntity, keyof HttpPayload>): ProjectTaskEntity {
        const args: ConstructorParameters<typeof ProjectTaskEntity> = [
            this.generateId(),
            partialFields.taskName,
            partialFields.taskType,
            partialFields.taskStatus,
            partialFields.startDateTime,
            partialFields.endDateTime,
            partialFields.description,
            partialFields.taskRule,
            partialFields.parentId,
            partialFields.order,
        ];
        return new ProjectTaskEntity(...args);
    }

    public createProjectTaskAttributeRequest(projectId: string, projectTaskAttribute: ProjectTaskAttributePayload, success: (attribute: ProjectTaskAttributePayload) => void, failure?: (error: Error) => void): void {
        const URL = "createProjectTaskAttributeRoute";
        this.post<ProjectTaskAttributePayload>(URL, {projectId, projectTaskAttribute}).then(success).catch(failure);
    }

    public getProjectTaskAttributesByProjectIdRequest(projectId: string, success: (attributes: Array<ProjectTaskAttributePayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectTaskAttributesByProjectIdRoute";
        this.post<Array<ProjectTaskAttributePayload>>(URL, {projectId}).then(success).catch(failure);
    }

    public getProjectTaskTypeSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectTaskTypeSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }

    public getProjectTaskStatusSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectTaskStatusSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }
}
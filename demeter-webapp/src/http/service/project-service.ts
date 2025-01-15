import {SelectProps} from "antd";
import {HttpService} from "@D/http/http-service.ts";
import {HttpPayload} from "@D/http/http-payload.ts";
import {ProjectPayload} from "@D/http/payload/project-payload.ts";

export class ProjectService extends HttpService<ProjectPayload> {

    private static instance: ProjectService;

    public static getInstance(): ProjectService {
        if (!ProjectService.instance) {
            ProjectService.instance = new ProjectService();
        }
        return ProjectService.instance;
    }

    public create(partialFields: Omit<ProjectPayload, keyof HttpPayload>): ProjectPayload {
        const args: ConstructorParameters<typeof ProjectPayload> = [
            this.generateId(),
            partialFields.projectName,
            partialFields.projectStatus,
            partialFields.startDateTime,
            partialFields.description,
            partialFields.endDateTime,
            partialFields.version,
            partialFields.order,
        ];
        return new ProjectPayload(...args);
    }

    public createProjectRequest(project: ProjectPayload, success: (project: ProjectPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/createProjectRoute";
        this.post<ProjectPayload>(URL, {...project}).then(success).catch(failure);
    }

    public createProjectsRequest(projects: Array<ProjectPayload>, success: (projects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/createProjectsRoute";
        this.post<Array<ProjectPayload>>(URL, {projects}).then(success).catch(failure);
    }

    public deleteProjectByIdRequest(projectId: string, success: (deletedProject: ProjectPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteProjectByIdRoute";
        this.post<ProjectPayload>(URL, {projectId}).then(success).catch(failure);
    }

    public deleteProjectsByIdsRequest(projectIds: Array<string>, success: (deletedProjects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteProjectsByIdsRoute";
        this.post<Array<ProjectPayload>>(URL, {projectIds}).then(success).catch(failure);
    }

    public updateProjectRequest(project: ProjectPayload, success: (updatedProject: ProjectPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/updateProjectRoute";
        this.put<ProjectPayload>(URL, {...project}).then(success).catch(failure);
    }

    public updateProjectsRequest(projects: Array<ProjectPayload>, success: (updatedProjects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/updateProjectsRoute";
        this.put<Array<ProjectPayload>>(URL, {projects}).then(success).catch(failure);
    }

    public getAllProjectsRequest(success: (projects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getAllProjectsRoute";
        this.get<Array<ProjectPayload>>(URL).then(success).catch(failure);
    }

    public getProjectByIdRequest(projectId: string, success: (project: ProjectPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectByIdRoute";
        this.post<ProjectPayload>(URL, {projectId}).then(success).catch(failure);
    }

    public getProjectsByIdsRequest(projectIds: Array<string>, success: (projects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectsByIdsRoute";
        this.post<Array<ProjectPayload>>(URL, {projectIds}).then(success).catch(failure);
    }

    public getProjectsByEmployeeIdRequest(success: (projects: Array<ProjectPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectsByEmployeeIdRoute";
        this.get<Array<ProjectPayload>>(URL).then(success).catch(failure);
    }

    public getProjectStatusSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectStatusSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }
}
import {useCallback} from "react";
import {ProjectPayload} from "@D/http/payload/project-payload.ts";
import {useDemeterDispatch} from "@D/core/store/demeter-hook.ts";
import {ProjectService} from "@D/http/service/project-service.ts";
import {createProject} from "@D/core/store/features/project-slice.ts";
import {setCreateScheduleModalVisible} from "@D/core/store/features/schedule-slice.ts";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message.tsx";

export const useCreateSchedule = () => {
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const addSchedule = useCallback((value: {
        projectName: string,
        projectStatus: number,
        startDateTime: string,
        endDateTime?: string,
        description?: string
    }) => {
        const projectService = ProjectService.getInstance();
        const projectEntity = projectService.create(value);
        projectService.createProjectRequest(projectEntity, (project: ProjectPayload) => {
            dispatch(createProject(project));
            dispatch(setCreateScheduleModalVisible(false));
            success("Create project successfully").then();
        }, (error: Error) => failure(projectService.parseResponseError(error)));
    }, [dispatch, failure, success]);
    return {
        createScheduleHolderMessage: <>{contextHolderMessage}</>,
        addSchedule
    };
}
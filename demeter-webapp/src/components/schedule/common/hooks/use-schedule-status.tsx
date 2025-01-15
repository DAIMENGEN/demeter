import {useEffect, useState} from "react";
import {SelectProps} from "antd";
import {ProjectService} from "@D/http/service/project-service.ts";

export const useScheduleStatus = () => {
    const [scheduleStatus, setScheduleStatus] = useState<SelectProps["options"]>([]);
    useEffect(() => {
        const projectService = ProjectService.getInstance();
        projectService.getProjectStatusSelectOptionsRequest(setScheduleStatus);
    }, [setScheduleStatus]);
    return scheduleStatus;
}
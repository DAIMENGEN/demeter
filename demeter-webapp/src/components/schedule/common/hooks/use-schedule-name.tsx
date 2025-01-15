import {useDemeterSelector} from "@D/core/store/demeter-hook.ts";

export const useScheduleName = (projectId: string) => {
    const project = useDemeterSelector(state => state.projectStore.projects.find(project => project.id === projectId));
    return project?.projectName ?? projectId;
}
import {useDemeterSelector} from "@D/core/store/demeter-hook.ts";

export const useProjects = () => {
    return useDemeterSelector(state => state.projectStore.projects);
}
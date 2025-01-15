import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectPayload} from "@D/http/payload/project-payload.ts";

export type ProjectStore = {
    projects: Array<ProjectPayload>;
}

const initialState: ProjectStore = {
    projects: []
}

const projectStoreSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        createProject(state, action: PayloadAction<ProjectPayload>) {
            state.projects.push(action.payload);
        },
        createProjects(state, action: PayloadAction<Array<ProjectPayload>>) {
            state.projects.push(...action.payload);
        },
        updateProject(state, action: PayloadAction<ProjectPayload>) {
            const projectId = action.payload.id;
            const index = state.projects.findIndex(project => project.id === projectId);
            if (index !== -1) {
                state.projects[index] = action.payload;
            } else {
                console.error(`Project with ID ${projectId} not found in the state.`);
            }
        },
        updateProjects(state, action: PayloadAction<Array<ProjectPayload>>) {
            action.payload.forEach(updatedProject => {
                const index = state.projects.findIndex(project => project.id === updatedProject.id);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                } else {
                    console.error(`Project with ID ${updatedProject.id} not found in the state.`);
                }
            });
        },
        deleteProject(state, action: PayloadAction<ProjectPayload>) {
            state.projects = state.projects.filter(project => project.id !== action.payload.id);
        },
        deleteProjects(state, action: PayloadAction<Array<ProjectPayload>>) {
            state.projects = state.projects.filter(project => !action.payload.some(deletedProject => deletedProject.id === project.id));
        },
        setProjects(state, action: PayloadAction<Array<ProjectPayload>>) {
            state.projects = action.payload;
        }
    }
});

export const {
    createProject,
    createProjects,
    updateProject,
    updateProjects,
    deleteProject,
    deleteProjects,
    setProjects
} = projectStoreSlice.actions;
export default projectStoreSlice.reducer;
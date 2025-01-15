import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import projectReducer from "@D/core/store/features/project-slice";
import employeeReducer from "@D/core/store/features/employee-slice";
import scheduleReducer from "@D/core/store/features/schedule-slice";
import {
    persistConfig,
    employeePersistConfig,
    schedulePersistConfig,
    projectPersistConfig
} from "@D/core/store/config/config";

const reducers = combineReducers({
    projectStore: persistReducer(projectPersistConfig, projectReducer),
    employeeStore: persistReducer(employeePersistConfig, employeeReducer),
    scheduleStore: persistReducer(schedulePersistConfig, scheduleReducer),
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const demeterStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(demeterStore);
export type DemeterDispatch = typeof demeterStore.dispatch;
export type DemeterState = ReturnType<typeof demeterStore.getState>;
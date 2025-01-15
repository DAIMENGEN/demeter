// import localStorage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session"

export const persistConfig = {
    key: "root",
    storage: sessionStorage,
    blacklist: ["employeeStore"],
};

export const employeePersistConfig = {
    key: "employeeStore",
    storage: sessionStorage,
};

export const schedulePersistConfig = {
    key: "scheduleStore",
    storage: sessionStorage,
};

export const projectPersistConfig = {
    key: "projectStore",
    storage: sessionStorage,
};


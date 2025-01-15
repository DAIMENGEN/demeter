import {useDemeterSelector} from "@D/core/store/demeter-hook";

export const useEmployeeId = () => {
    const employeeId = useDemeterSelector(state => state.employeeStore.employeeId);
    return employeeId ?? "";
}
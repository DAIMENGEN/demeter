import {useDemeterSelector} from "@D/core/store/demeter-hook";

export const useEmployeeName = () => {
    const employeeName = useDemeterSelector(state => state.employeeStore.employeeName);
    return employeeName ?? "Unknown";
}
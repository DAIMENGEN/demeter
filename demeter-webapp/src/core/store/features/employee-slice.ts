import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type EmployeeStore = {
    employeeId?: string;
    employeeName?: string;
};

const initialState: EmployeeStore = {
    employeeId: undefined,
    employeeName: undefined,
};

const employeeStoreSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setEmployeeIdAction: (state, action: PayloadAction<string>) => {
            state.employeeId = action.payload;
        },
        setEmployeeNameAction: (state, action: PayloadAction<string>) => {
            state.employeeName = action.payload;
        }
    }
});

export const {
    setEmployeeIdAction,
    setEmployeeNameAction} = employeeStoreSlice.actions;
export default employeeStoreSlice.reducer;
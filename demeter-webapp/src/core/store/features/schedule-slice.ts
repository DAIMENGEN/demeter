import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ScheduleStore = {
    createScheduleModalVisible: boolean,
    renameScheduleId?: string,
    renameScheduleModalVisible: boolean,
}

const initialState: ScheduleStore = {
    createScheduleModalVisible: false,
    renameScheduleId: undefined,
    renameScheduleModalVisible: false,
};

const scheduleStoreSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setCreateScheduleModalVisible: (state, action: PayloadAction<boolean>) => {
            state.createScheduleModalVisible = action.payload;
        },
        setRenameScheduleId: (state, action: PayloadAction<string>) => {
            state.renameScheduleId = action.payload;
        },
        setRenameScheduleModalVisible: (state, action: PayloadAction<boolean>) => {
            state.renameScheduleModalVisible = action.payload;
        },
    },
});

export const {setCreateScheduleModalVisible, setRenameScheduleId, setRenameScheduleModalVisible} = scheduleStoreSlice.actions;
export default scheduleStoreSlice.reducer;
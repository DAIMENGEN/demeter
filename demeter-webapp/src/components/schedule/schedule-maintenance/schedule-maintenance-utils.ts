import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {SnowflakeIdUtil} from "@D/utils/snowflake-id-util.ts";

export class ScheduleMaintenanceUtils {
    public static createRecord(parentKey?: string, copyTableRowData?: ProjectTaskPayload): ProjectTaskPayload {
        if (copyTableRowData) {
            return {
                ...copyTableRowData,
                id: SnowflakeIdUtil.nextId().toString()
            }
        }
        return {
            id: SnowflakeIdUtil.nextId().toString(),
            taskName: "New Schedule",
            parentTaskId: parentKey,
        }
    }
}
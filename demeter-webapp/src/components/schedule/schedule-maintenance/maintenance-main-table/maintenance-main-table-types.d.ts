import {ProColumns} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";

export type TableColumn = ProColumns<ProjectTaskPayload>;

export type TableColumns = TableColumn[];

export type TableColumnConfig = {
    tableColumn: TableColumn;
    display: boolean;
}

export type TableColumnConfigs = TableColumnConfig[];
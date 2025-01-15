import React from "react";
import {
    TableColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";
import {Button} from "antd";

export const EndDateTimeColumn: React.FC<{
    projectId: string,
    createTableColumn: (tableColumn: TableColumn) => void;
}> = () => {
    return (
        <div className={"end-date-time-column"}>
            <Button>
                EndDateTime
            </Button>
        </div>
    )
}
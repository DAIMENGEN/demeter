import React, {useEffect, useMemo, useState} from "react";
import {
    TableColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";
import {Button, SelectProps} from "antd";
import {ProjectTaskService} from "@D/http/service/project-task-service.ts";
import {SnowflakeIdUtil} from "@D/utils/snowflake-id-util.ts";
import {JsonUtils} from "@D/utils/json-utils.ts";
import {ProjectTaskAttributePayload} from "@D/http/payload/project-task-attribute-payload.ts";
import {JsonObject} from "@D/global-types";

export const TaskTypeColumn: React.FC<{
    projectId: string,
    createTableColumn: (tableColumn: TableColumn) => void;
}> = ({projectId, createTableColumn}) => {
    const [taskTypeOptions, setTaskTypeOptions] = useState<SelectProps["options"]>([]);
    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);

    useEffect(() => {
        projectTaskService.getProjectTaskTypeSelectOptionsRequest((options: SelectProps["options"]) => {
            setTaskTypeOptions(options);
        })
    }, [projectTaskService]);

    return (
        <div className={"task-type-column"}>
            <Button onClick={() => {
                if (taskTypeOptions) {
                    const taskAttributeId = SnowflakeIdUtil.nextId().toString();
                    const taskAttributeProperties = JsonUtils.stringify({
                        title: "TaskType",
                        valueType: "select",
                        fieldProps: {
                            options: taskTypeOptions,
                            defaultValue: 1,
                            showSearch: true,
                        }
                    });
                    const taskAttribute = new ProjectTaskAttributePayload(
                        taskAttributeId,
                        `attribute-name-${taskAttributeId}`,
                        "int",
                        taskAttributeProperties,
                        0
                    );
                    projectTaskService.createProjectTaskAttributeRequest(projectId, taskAttribute, () => {
                        const properties: JsonObject = JsonUtils.parse(taskAttribute.properties);
                        const title = (properties.title ?? taskAttribute.taskAttributeName) as string;
                        createTableColumn({
                            key: taskAttribute.id,
                            title: title,
                            valueType: "select",
                            dataIndex: taskAttribute.id,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            fieldProps: properties.fieldProps,
                        });
                    });
                }
            }}>
                TaskType
            </Button>
        </div>
    );
}
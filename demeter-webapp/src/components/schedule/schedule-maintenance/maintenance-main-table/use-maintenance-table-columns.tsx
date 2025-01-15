import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectTaskService} from "@D/http/service/project-task-service.ts";
import {JsonObject} from "@D/global-types";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message.tsx";
import {
    TableColumn,
    TableColumnConfigs,
    TableColumns
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";

export const useMaintenanceTableColumns = (projectId: string) => {
    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);
    const {contextHolderMessage, failure} = useAntdMessage();
    const [tableColumnConfigs, setTableColumnConfigs] = useState<TableColumnConfigs>([]);

    const createTableColumn = useCallback((tableColumn: TableColumn) => {
        setTableColumnConfigs(configs => {
            const exists = configs.some(c => c.tableColumn.key === tableColumn.key)
            if (!exists) {
                const targetIndex = configs.length - 1;
                return [
                    ...configs.slice(0, targetIndex),
                    {tableColumn, display: true},
                    ...configs.slice(targetIndex)
                ];
            } else {
                failure("Column already exists", 2).then();
            }
            return configs;
        });
    }, [failure]);

    const displayTableColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setTableColumnConfigs(configs => configs.map(c => {
                c.display = true;
                return c;
            }));
        } else {
            setTableColumnConfigs(configs => configs.map(c => {
                if (c.tableColumn.key === columnKey) {
                    c.display = true;
                }
                return c;
            }));
        }
    }, []);

    const hiddenTableColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setTableColumnConfigs(configs => configs.map(c => {
                c.display = false;
                return c;
            }));
        } else {
            setTableColumnConfigs(configs => configs.map(c => {
                if (c.tableColumn.key === columnKey) {
                    c.display = false;
                }
                return c;
            }));
        }
    }, []);

    const updateTableColumn = useCallback((tableColumn: TableColumn) => {
        setTableColumnConfigs(configs => configs.map(c => c.tableColumn.key === tableColumn.key ? {
            tableColumn,
            display: true
        } : c));
    }, []);

    useEffect(() => {
        const defaultColumns: TableColumns = [
            {
                key: "taskName",
                title: "TaskName",
                dataIndex: "taskName",
                fieldProps: {
                    placeholder: "This field is required.",
                },
                formItemProps: {
                    rules: [
                        {required: true, message: "This field is required."},
                    ],
                },
                minWidth: 200,
            },
        ];
        const actionColumns: TableColumns = [
            {
                key: "action",
                title: "Action",
                valueType: "option",
                width: 100,
                render: () => {
                    return null;
                },
            }
        ];
        projectTaskService.getProjectTaskAttributesByProjectIdRequest(projectId, attributes => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const columns: TableColumns = attributes.map(attribute => {
                const properties: JsonObject = JSON.parse(attribute.properties ?? "{}");
                const title = (properties.title ?? attribute.taskAttributeName) as string;
                return {
                    key: attribute.id,
                    title: title,
                    dataIndex: attribute.taskAttributeName,
                    valueType: properties.valueType,
                    minWidth: properties.minWidth,
                    fieldProps: properties.fieldProps,
                }
            });
            const tableColumns: TableColumns = defaultColumns.concat(columns).concat(actionColumns);
            setTableColumnConfigs(tableColumns.map(tableColumn => ({tableColumn, display: true})));
        }, error => {
            console.log(error);
        });
    }, [projectId, projectTaskService]);

    return {
        hiddenTableColumn,
        createTableColumn,
        updateTableColumn,
        displayTableColumn,
        tableColumnConfigs,
        createTableColumnMessage: contextHolderMessage,
    }
}
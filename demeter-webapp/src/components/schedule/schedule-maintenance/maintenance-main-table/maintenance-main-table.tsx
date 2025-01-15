import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {
    useMaintenanceTableScroll
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/use-maintenance-table-scroll.tsx";
import {Button, Popconfirm} from "antd";
import {SaveIcon01} from "@D/icons/save-icon/save-icon-01.tsx";
import {CopyIcon01} from "@D/icons/copy-icon/copy-icon-01.tsx";
import {PRIMARY_COLOR} from "@D/core/style/theme.ts";
import {DeleteIcon01} from "@D/icons/delete-icon/delete-icon-01.tsx";
import {
    MaintenanceTableHeaderTitle
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-table-header-title.tsx";
import {ActionType, EditableProTable} from "@ant-design/pro-table";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";
import React, {useRef, useState} from "react";
import {
    useMaintenanceTableColumns
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/use-maintenance-table-columns.tsx";

export const MaintenanceMainTable: React.FC<{ projectId: string }> = ({projectId}) => {
    const {contextHolderMessage, success} = useAntdMessage();
    const scheduleMaintenanceTableActionRef = useRef<ActionType>();
    const {
        hiddenTableColumn,
        createTableColumn,
        updateTableColumn,
        displayTableColumn,
        tableColumnConfigs,
        createTableColumnMessage
    } = useMaintenanceTableColumns(projectId);
    const [dataSource, setDataSource] = useState<readonly ProjectTaskPayload[]>([]);
    const [copyTableRowData, setCopyTableRowData] = useState<ProjectTaskPayload>();
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
    const [parentKey, setParentKey] = useState<string | undefined>(undefined);
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(dataSource.map((item) => item.id));
    return (
        <div className={"schedule-maintenance-main-table"}>
            <span>{contextHolderMessage}</span>
            <span>{createTableColumnMessage}</span>
            <EditableProTable<ProjectTaskPayload>
                rowKey="id"
                value={dataSource}
                columns={tableColumnConfigs.filter(c => c.display).map(c => c.tableColumn)}
                recordCreatorProps={false}
                scroll={useMaintenanceTableScroll()}
                actionRef={scheduleMaintenanceTableActionRef}
                expandable={{
                    defaultExpandAllRows: true,
                    expandedRowKeys: expandedRowKeys,
                    onExpandedRowsChange: (expandedRowKeys) => {
                        setExpandedRowKeys([...expandedRowKeys]);
                    }
                }}
                rowSelection={dataSource.length > 0 && {
                    type: "radio",
                    onChange: (selectedRowKeys) => {
                        setParentKey(selectedRowKeys[0] as string);
                    }
                }}
                toolBarRender={() => {
                    return [
                        <Button key="save"
                                type="primary"
                                icon={<SaveIcon01 width={20} height={20} color={"#fff"}/>}
                                onClick={() => {
                                    // dataSource 就是当前数据，可以调用 api 将其保存
                                    console.log(dataSource);
                                }}/>,
                    ];
                }}
                editable={{
                    type: "multiple",
                    editableKeys,
                    actionRender: (row) => {
                        return [
                            <Button key={"copy"}
                                    title={"Copy"}
                                    icon={<CopyIcon01 width={20} height={20} color={PRIMARY_COLOR}/>}
                                    onClick={() => {
                                        setCopyTableRowData(row)
                                        success("Copy Successfully", 0.5).then();
                                    }}/>,
                            <Popconfirm key={"delete"}
                                        placement={"left"}
                                        title={`Delete the ${row.name}`}
                                        description={"Are you sure to delete this row?"}
                                        okText={"Yes"}
                                        cancelText={"No"}
                                        onConfirm={() => setDataSource(dataSource.filter(item => item.id !== row.id))}>
                                <Button title={"Delete"}
                                        icon={<DeleteIcon01 width={20} height={20} color={PRIMARY_COLOR}/>}/>
                            </Popconfirm>,
                        ];
                    },
                    onValuesChange: (record, recordList) => {
                        setDataSource(recordList);
                        if (!record && copyTableRowData) {
                            setCopyTableRowData(undefined);
                            success("Paste Successfully", 0.5).then();
                        }
                    },
                    onChange: setEditableRowKeys,
                }}
                headerTitle={<MaintenanceTableHeaderTitle
                    projectId={projectId}
                    parentKey={parentKey}
                    copyTableRowData={copyTableRowData}
                    createTableColumn={createTableColumn}
                    updateTableColumn={updateTableColumn}
                    hiddenTableColumn={hiddenTableColumn}
                    displayTableColumn={displayTableColumn}
                    tableColumnConfigs={tableColumnConfigs}
                    setExpandedRowKeys={setExpandedRowKeys}
                    tableActionRef={scheduleMaintenanceTableActionRef}
                />}
            />
        </div>
    )
}
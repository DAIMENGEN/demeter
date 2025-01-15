import React, {MutableRefObject, useMemo, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {Button, Checkbox, Col, Divider, Dropdown, Flex, Input, Popover, Row, Space} from "antd";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils.ts";
import {HideIcon01} from "@D/icons/hide-icon/hide-icon-01.tsx";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme.ts";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01.tsx";
import {AddColumnIcon01} from "@D/icons/column-icon/add-column-icon-01.tsx";
import {ImportIcon01} from "@D/icons/import-icon/import-icon-01.tsx";
import {DownOutlined} from "@ant-design/icons";
import {
    TableColumnConfigs
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";
import {
    CustomColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/columns/custom-column.tsx";
import {
    TaskTypeColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/columns/task-type-column.tsx";
import {
    TaskStatusColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/columns/task-status-column.tsx";
import {
    StartDateTimeColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/columns/start-date-time-column.tsx";
import {
    EndDateTimeColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/columns/end-date-time-column.tsx";

export const MaintenanceTableHeaderTitle: React.FC<{
    tableActionRef: MutableRefObject<ActionType | undefined>;
    projectId: string;
    parentKey: string | undefined;
    createTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    updateTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    hiddenTableColumn: (tableColumnKey: React.Key) => void;
    displayTableColumn: (tableColumnKey: React.Key) => void;
    tableColumnConfigs: TableColumnConfigs;
    copyTableRowData?: ProjectTaskPayload;
    setExpandedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}> = ({
          tableActionRef,
          tableColumnConfigs,
          projectId,
          parentKey,
          createTableColumn,
          // updateTableColumn,
          hiddenTableColumn,
          displayTableColumn,
          copyTableRowData,
          setExpandedRowKeys
      }) => {
    const [hiddenTableColumnKeys, setHiddenTableColumnKeys] = useState<React.Key[]>([]);
    const [highlightHideColumnButton, setHighlightHideColumnButton] = useState<boolean>();
    const [highlightCreateColumnButton, setHighlightCreateColumnButton] = useState<boolean>();
    const isAllColumnsVisible = useMemo(() => tableColumnConfigs.every(c => c.display), [tableColumnConfigs]);
    return (
        <div className={"schedule-maintenance-main-table-header-title"}>
            <Flex gap={10}>
                <Dropdown.Button type={"primary"}
                                 placement={"bottomLeft"}
                                 icon={<DownOutlined/>}
                                 menu={{
                                     items: [
                                         {
                                             key: "import-task",
                                             icon: <ImportIcon01 width={16} height={16} color={"#000000"}/>,
                                             label: "Import tasks",
                                             onClick: () => alert("Import tasks")
                                         }
                                     ]
                                 }}
                                 onClick={() => {
                                     tableActionRef.current?.addEditRecord(ScheduleMaintenanceUtils.createRecord(parentKey, copyTableRowData), {
                                         parentKey: parentKey,
                                         newRecordType: "dataSource",
                                     });
                                     if (parentKey) {
                                         setExpandedRowKeys(keys => [...keys, parentKey])
                                     }
                                 }}>
                    New Task
                </Dropdown.Button>
                <Popover arrow={false}
                         trigger={"click"}
                         placement={"bottomLeft"}
                         destroyTooltipOnHide={true}
                         onOpenChange={setHighlightHideColumnButton}
                         content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                             <Input placeholder="Find columns to show/hide"
                                    onChange={e => {
                                        const searchValue = e.target.value;
                                        const regex = new RegExp(searchValue, "i");
                                        const hiddenTableColumnKeys = tableColumnConfigs.filter(c => !regex.test(c.tableColumn.title as string)).map(c => c.tableColumn.key).filter(c => c !== undefined);
                                        setHiddenTableColumnKeys(hiddenTableColumnKeys);
                                    }}
                                    suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                             <Checkbox indeterminate={!isAllColumnsVisible} onChange={e => {
                                 const checked = e.target.checked;
                                 if (checked) displayTableColumn("*"); else hiddenTableColumn("*");
                             }} checked={isAllColumnsVisible}>
                                 <span style={{fontWeight: "bold"}}>All columns</span>
                                 <span>&nbsp;&nbsp;&nbsp;</span>
                                 <span
                                     style={{color: "#7e7f8d"}}>{tableColumnConfigs.filter(c => c.display).length} selected</span>
                             </Checkbox>
                             <Flex vertical={true} gap={"small"}>
                                 {
                                     tableColumnConfigs.filter(c => c.tableColumn.key !== undefined && !hiddenTableColumnKeys.includes(c.tableColumn.key)).map(option =>
                                         <Checkbox key={option.tableColumn.key}
                                                   value={option.tableColumn.key}
                                                   checked={option.display}
                                                   onChange={e => {
                                                       const checked = e.target.checked;
                                                       if (checked) displayTableColumn(option.tableColumn.key as string); else hiddenTableColumn(option.tableColumn.key as string);
                                                   }}
                                         >{option.tableColumn.title as string}</Checkbox>)
                                 }
                             </Flex>
                         </Space>}>
                    <Button type="text"
                            style={{backgroundColor: highlightHideColumnButton ? HIGHLIGHT_COLOR : ""}}
                            icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                        Hide
                    </Button>
                </Popover>
                <Popover arrow={false}
                         trigger={"click"}
                         placement={"bottomLeft"}
                         destroyTooltipOnHide={true}
                         onOpenChange={setHighlightCreateColumnButton}
                         content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                             <Input placeholder="Search column type"
                                    onChange={e => {
                                        const searchValue = e.target.value;
                                        console.log(searchValue);
                                    }}
                                    suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                             <Flex gap={10} vertical={true} wrap={true}>
                                 <div>
                                     <Divider orientationMargin={0} orientation={"left"} style={{color: "#7e7f8d"}}
                                              plain>
                                         System Columns
                                     </Divider>
                                     <Space direction={"vertical"} size={10}>
                                         <Row gutter={24}>
                                             <Col className="gutter-row" span={12}>
                                                 <TaskTypeColumn projectId={projectId} createTableColumn={createTableColumn}/>
                                             </Col>
                                             <Col className="gutter-row" span={12}>
                                                 <TaskStatusColumn projectId={projectId} createTableColumn={createTableColumn}/>
                                             </Col>
                                         </Row>
                                         <Row gutter={24}>
                                             <Col className="gutter-row" span={12}>
                                                 <StartDateTimeColumn projectId={projectId} createTableColumn={createTableColumn}/>
                                             </Col>
                                             <Col className="gutter-row" span={12}>
                                                 <EndDateTimeColumn projectId={projectId} createTableColumn={createTableColumn}/>
                                             </Col>
                                         </Row>
                                     </Space>
                                 </div>
                                 <div>
                                     <Divider orientationMargin={0} orientation={"left"} style={{color: "#7e7f8d"}}
                                              plain>
                                         Custom Columns
                                     </Divider>
                                     <Flex gap={10} wrap={true}>
                                         <CustomColumn projectId={projectId} createTableColumn={createTableColumn}/>
                                     </Flex>
                                 </div>
                             </Flex>
                         </Space>}>
                    <Button type="text"
                            style={{backgroundColor: highlightCreateColumnButton ? HIGHLIGHT_COLOR : ""}}
                            icon={<AddColumnIcon01 width={16} height={16} color={"#000000"}/>}>
                        Colum</Button>
                </Popover>
            </Flex>
        </div>
    );
}
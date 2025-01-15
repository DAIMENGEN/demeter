import "./schedule-maintenance.scss";
import {Button, Flex, Popover, Tabs} from "antd";
import {useHtmlDivElementRef} from "@D/core/hooks/ref/use-html-div-element-ref.tsx";
import {MessageIcon01} from "@D/icons/message-icon/message-icon-01.tsx";
import {PeopleIcon01} from "@D/icons/people-icon/people-icon-01.tsx";
import {MoreIcon01} from "@D/icons/more-icon/more-icon-01.tsx";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme.ts";
import {DownIcon01} from "@D/icons/down-icon/down-icon-01.tsx";
import {HouseIcon01} from "@D/icons/house-icon/house-icon-01.tsx";
import {GanttIcon01} from "@D/icons/gantt-icon/gantt-icon-01.tsx";
import {useState} from "react";
import {
    MaintenanceMainTable
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table.tsx";
import {useParams} from "react-router-dom";
import {useScheduleName} from "@D/components/schedule/common/hooks/use-schedule-name.tsx";

export const ScheduleMaintenance = () => {
    const {projectId} = useParams<{projectId: string}>();
    const scheduleMaintenanceRef = useHtmlDivElementRef();
    const [highlightScheduleTitle, setHighlightScheduleTitle] = useState<boolean>();
    return (
        <div className={"schedule-maintenance"} ref={scheduleMaintenanceRef}>
            <div className={"schedule-maintenance-header"}>
                <Flex justify={"space-between"}>
                    <Popover title={"ScheduleTitle"}
                             trigger="click"
                             arrow={false}
                             placement="bottomLeft"
                             onOpenChange={setHighlightScheduleTitle}>
                        <Button type={"text"}
                                iconPosition={"end"}
                                style={{backgroundColor: highlightScheduleTitle ? HIGHLIGHT_COLOR : ""}}
                                icon={<DownIcon01 width={15} height={15} color={"#000000"}/>}>
                            <span style={{fontSize: 25, fontWeight: "normal"}}>{useScheduleName(projectId as string)}</span>
                        </Button>
                    </Popover>
                    <Flex gap={10} justify={"flex-end"} style={{paddingRight: 10}}>
                        <Button type={"text"} icon={<MessageIcon01 width={20} height={20} color={"#000000"}/>}/>
                        <Button type={"text"} icon={<PeopleIcon01 width={20} height={20} color={"#000000"}/>}/>
                        <Button type={"text"} icon={<MoreIcon01 width={20} height={20} color={"#000000"}/>}/>
                    </Flex>
                </Flex>
                <Tabs items={[
                    {
                        key: "main-table",
                        label: <Button type={"text"} icon={<HouseIcon01 width={15} height={15} color={"#000000"}/>}>Main
                            Table</Button>,
                    },
                    {
                        key: "main-gantt",
                        label: <Button type={"text"} icon={<GanttIcon01 width={15} height={15} color={"#000000"}/>}>Main
                            Gantt</Button>,
                    }
                ]} tabBarGutter={0}/>
            </div>
            <div className={"schedule-maintenance-body"}>
                <MaintenanceMainTable projectId={projectId as string}/>
                {/*<MaintenanceMainGantt/>*/}
            </div>
        </div>
    )
}
import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";

export const GanttIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const ganttIcon = () => (
        <svg className="gantt-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M982 982c-27 27-60 41-100 42H142c-40-1-73-15-100-42S1 922 0 882V142c1-40 15-73 42-100S102 1 142 0h740c40 1 73 15 100 42s41 60 42 100v740c-1 40-15 73-42 100zM87 937c19 19 43 29 72 30h706c57-1 101-45 102-102V626H711c-16-1-29-13-29-29s13-28 29-28h256V159c0-56-46-102-102-102H159c-56 0-102 46-102 102v706c1 29 11 53 30 72z m587-661c-5 5-12 8-20 8H143c-16 0-29-12-29-28s12-28 29-28h511c25 0 38 30 20 48z m228 171c-5 5-12 8-21 8H370c-16 0-28-12-28-28s12-28 28-29h511c25 2 39 31 21 49zM504 617c-5 5-12 8-20 9H199c-16-1-28-13-28-29s12-28 28-28h285c25 0 38 30 20 48z m341 171c-5 5-12 8-20 8H484c-29 0-29-31-29-29 0-15 13-27 29-27h341c25 0 38 30 20 48z"
                fill={props.color}></path>
        </svg>
    );

    return <Icon component={ganttIcon} {...props}/>
}
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const ScheduleIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const scheduleIcon = () => (
        <svg className="schedule-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M796.444444 113.777778V56.888889h-56.888888v56.888889H284.444444V56.888889H227.555556v56.888889H56.888889v853.333333h910.222222V113.777778h-170.666667z m113.777778 796.444444H113.777778V170.666667h113.777778v56.888889h56.888888V170.666667h455.111112v56.888889h56.888888V170.666667h113.777778v739.555555z"
                fill={props.color}></path>
            <path
                d="M443.733333 671.288889L307.2 529.066667l-45.511111 39.822222 182.044444 182.044444 341.333334-341.333333-39.822223-39.822222z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={scheduleIcon} {...props}/>
}
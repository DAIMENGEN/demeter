import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";

export const ColumnIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const columnIcon = () => (
        <svg className="column-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M272 128a48 48 0 0 1 47.776 43.392L320 176v672a48 48 0 0 1-43.392 47.776L272 896h-160a48 48 0 0 1-47.776-43.392L64 848v-672a48 48 0 0 1 43.392-47.776L112 128h160z m320 0a48 48 0 0 1 47.776 43.392L640 176v672a48 48 0 0 1-43.392 47.776L592 896h-160a48 48 0 0 1-47.776-43.392L384 848v-672a48 48 0 0 1 43.392-47.776L432 128h160z m320 0a48 48 0 0 1 47.776 43.392L960 176v672a48 48 0 0 1-43.392 47.776L912 896h-160a48 48 0 0 1-47.776-43.392L704 848v-672a48 48 0 0 1 43.392-47.776L752 128h160zM256 192H128v640h128V192z m320 0h-128v640h128V192z m320 0h-128v640h128V192z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={columnIcon} {...props}/>
}
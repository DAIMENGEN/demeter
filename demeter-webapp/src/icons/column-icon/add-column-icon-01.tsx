import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {StyleUtil} from "@D/utils/style-util.ts";

export const AddColumnIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const addColumnIcon = () => (
        <svg className="add-column-icon-02" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M707.328 772.16l73.472 73.472v-181.76h59.712v181.76l73.472-73.472 42.24 42.24-145.536 145.536-145.6-145.6 42.24-42.176zM64 960h547.584V213.312H64V960z m303.616-59.712v-627.2h184.192v627.2H367.616z m-59.712 0H123.712v-627.2h184.192v627.2zM661.312 64v547.584H960V64h-298.688z m238.976 59.712v428.16h-179.2v-428.16h179.2z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={addColumnIcon} {...props}/>
}
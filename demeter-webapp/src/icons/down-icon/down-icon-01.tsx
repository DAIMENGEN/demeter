import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {StyleUtil} from "@D/utils/style-util.ts";

export const DownIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const downIcon = () => (
        <svg className="down-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M1009.342 248.63c-19.452-19.6-51.112-19.71-70.712-0.26L510.7 673.14 85.63 244.92c-19.45-19.6-51.11-19.71-70.71-0.26-19.6 19.45-19.72 51.11-0.26 70.71l460 463.41c0.05 0.05 0.11 0.1 0.17 0.16 0.04 0.04 0.08 0.09 0.13 0.13 9.77 9.85 22.63 14.78 35.49 14.78 12.73 0 25.47-4.83 35.22-14.51l463.412-460c19.6-19.46 19.71-51.11 0.26-70.71z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={downIcon} {...props}/>
}
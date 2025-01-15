import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const QuickIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const quickIcon = () => (
        <svg className="quick-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M706.876952 172.30019A32.01219 32.01219 0 0 0 677.302857 128H405.333333c-12.921905 0-24.576 7.777524-29.525333 19.69981l-177.785905 426.666666a31.98781 31.98781 0 0 0 29.525334 44.300191H426.666667l-56.515048 254.293333c-7.289905 32.816762 34.474667 53.248 55.905524 27.355429L809.935238 436.394667c17.286095-20.845714 2.438095-52.394667-24.624762-52.394667h-166.66819l88.210285-211.69981z m-176.201142 270.384762h197.973333l-277.211429 334.921143 48.37181-217.6h-232.252953l155.550477-373.345524h214.235428l-106.666666 256z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={quickIcon} {...props}/>
}
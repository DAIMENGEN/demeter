import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";

export const HouseIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const houseIcon = () => (
        <svg className="house-icon-01" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M875.989333 576a21.333333 21.333333 0 0 0-21.333333 21.333333v384h-213.333333V682.666667h-256v298.666666h-213.333334V576a21.333333 21.333333 0 1 0-42.666666 0v448h298.666666V725.333333h170.666667v298.666667h298.666667V597.333333a21.333333 21.333333 0 0 0-21.333334-21.333333z"
                fill={props.color}></path>
            <path
                d="M1019.072 539.584l-490.666667-490.666667a21.312 21.312 0 0 0-30.165333 0l-490.666667 490.666667a21.312 21.312 0 1 0 30.165334 30.165333L513.322667 94.165333l475.584 475.584a21.269333 21.269333 0 0 0 30.165333 0 21.312 21.312 0 0 0 0-30.165333zM683.989333 128h128v128a21.333333 21.333333 0 1 0 42.666667 0V85.333333h-170.666667a21.333333 21.333333 0 1 0 0 42.666667z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={houseIcon} {...props}/>
}
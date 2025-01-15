import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {StyleUtil} from "@D/utils/style-util.ts";

export const StarIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const starIcon = () => (
        <svg className="star-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M512.009505 25.054894l158.199417 320.580987 353.791078 51.421464L767.995248 646.579761l60.432101 352.365345-316.417844-166.354615-316.436854 166.354615 60.432101-352.365345L0 397.057345l353.791078-51.421464z"
                fill={props.color}></path>
        </svg>
    )
    // "#EFCE4A"
    return <Icon component={starIcon} {...props}/>
}
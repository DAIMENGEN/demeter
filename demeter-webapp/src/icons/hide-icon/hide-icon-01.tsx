import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {StyleUtil} from "@D/utils/style-util.ts";

export const HideIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const hideIcon = () => (
        <svg className="hide-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M956.8 496c-41.6-70.4-99.2-147.2-176-204.8l105.6-105.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-115.2 115.2C665.6 214.4 592 192 512 192 297.6 192 153.6 358.4 67.2 496c-6.4 9.6-6.4 22.4 0 32 41.6 70.4 102.4 147.2 176 204.8l-108.8 108.8c-12.8 12.8-12.8 32 0 44.8C144 892.8 150.4 896 160 896s16-3.2 22.4-9.6l115.2-115.2c60.8 38.4 134.4 60.8 214.4 60.8 185.6 0 374.4-128 444.8-307.2C960 515.2 960 505.6 956.8 496zM134.4 512c76.8-121.6 201.6-256 377.6-256 60.8 0 118.4 16 166.4 44.8l-80 80C576 361.6 544 352 512 352c-89.6 0-160 70.4-160 160 0 32 9.6 64 25.6 89.6l-89.6 89.6C224 640 172.8 572.8 134.4 512zM608 512c0 54.4-41.6 96-96 96-16 0-28.8-3.2-41.6-9.6l128-128C604.8 483.2 608 496 608 512zM416 512c0-54.4 41.6-96 96-96 16 0 28.8 3.2 41.6 9.6l-128 128C419.2 540.8 416 528 416 512zM512 768c-60.8 0-118.4-16-166.4-44.8l80-80C448 662.4 480 672 512 672c89.6 0 160-70.4 160-160 0-32-9.6-64-25.6-89.6l89.6-89.6c67.2 51.2 118.4 118.4 156.8 179.2C825.6 659.2 665.6 768 512 768z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={hideIcon} {...props}/>
}
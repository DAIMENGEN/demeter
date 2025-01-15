import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const AddIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const addIcon = () => (
        <svg className="add-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M972.8 512c0 11.264-9.216 20.48-20.48 20.48H532.48v419.84c0 11.264-9.216 20.48-20.48 20.48s-20.48-9.216-20.48-20.48V532.48H71.68c-11.264 0-20.48-9.216-20.48-20.48s9.216-20.48 20.48-20.48h419.84V71.68c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v419.84h419.84c11.264 0 20.48 9.216 20.48 20.48z"
                fill={props.color}
            ></path>
        </svg>
    )

    return <Icon component={addIcon} {...props}/>
}
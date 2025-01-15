import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const ImportIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const importIcon = () => (
        <svg className="import-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M512 823.838118l-292.321882-290.936471 42.465882-42.706823L481.882353 708.909176V58.548706h60.235294v650.36047l219.678118-218.654117 42.465882 42.706823L512 823.838118zM963.764706 543.924706v389.722353a30.117647 30.117647 0 0 1-30.117647 30.117647h-843.294118a30.117647 30.117647 0 0 1-30.117647-30.117647V543.623529H0V933.647059c0 49.814588 40.538353 90.352941 90.352941 90.352941h843.294118c49.814588 0 90.352941-40.538353 90.352941-90.352941V543.924706h-60.235294z"
                fill={props.color}
            ></path>
        </svg>
    )

    return <Icon component={importIcon} {...props}/>
}
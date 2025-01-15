import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {StyleUtil} from "@D/utils/style-util.ts";

export const StarIcon02: React.FC<{ width: number, height: number, color?: string }> = (props) => {

    const starIcon = () => (
        <svg className="star-icon-02" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M1024 397.05l-353.78-51.408L512 25.06l-158.216 320.582L0 397.05l256 249.538L195.568 998.94 512 832.582l316.432 166.358-60.434-352.352L1024 397.05zM512 753.498l-223.462 117.48 42.676-248.83-180.786-176.222 249.84-36.304L512 183.226l111.736 226.396 249.836 36.304-180.788 176.222 42.678 248.83L512 753.498z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={starIcon} {...props}/>
}
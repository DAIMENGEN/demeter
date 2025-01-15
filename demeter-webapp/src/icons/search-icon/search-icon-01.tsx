import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const SearchIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const searchIcon = () => (
        <svg className="search-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M675.328 635.107556l141.824 141.824a28.444444 28.444444 0 1 1-40.220444 40.220444l-141.824-141.824a284.444444 284.444444 0 1 1 40.220444-40.220444zM455.111111 682.666667a227.555556 227.555556 0 1 0 0-455.111111 227.555556 227.555556 0 0 0 0 455.111111z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={searchIcon} {...props}/>
}
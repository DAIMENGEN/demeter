import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";

export const PeopleIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const peopleIcon = () => (
        <svg className="people-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M768 728.615v-19.692C756.185 598.646 645.908 512 512 512s-244.185 86.646-256 192.985v23.63c0 43.323 35.446 78.77 78.77 78.77h354.46c43.324 0 78.77-35.447 78.77-78.77zM512 1024C228.43 1024 0 795.57 0 512S228.43 0 512 0s512 228.43 512 512-228.43 512-512 512z m0-555.323c94.523 0 169.354-74.83 169.354-169.354S606.524 126.031 512 126.031 342.646 204.8 342.646 299.323 417.476 468.677 512 468.677z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={peopleIcon} {...props}/>
}
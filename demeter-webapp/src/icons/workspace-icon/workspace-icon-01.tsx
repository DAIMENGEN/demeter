import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";
import Icon from "@ant-design/icons/lib/components/Icon";

export const WorkspaceIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const workspaceIcon = () => (
        <svg className="workspace-icon-01" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M64 16.192a48 48 0 0 0-48 48v344.64c0 26.496 21.504 48 48 48h344.64a48 48 0 0 0 48-48V64.192a48 48 0 0 0-48-48H64z m48 344.64V112.192h248.64v248.64H112zM615.36 16.192a48 48 0 0 0-48 48v344.64c0 26.496 21.504 48 48 48H960a48 48 0 0 0 48-48V64.192a48 48 0 0 0-48-48H615.36z m48 344.64V112.192h248.64v248.64h-248.64zM16 615.552a48 48 0 0 1 48-48h344.64a48 48 0 0 1 48 48v344.64a48 48 0 0 1-48 48H64a48 48 0 0 1-48-48V615.552z m96 48v248.64h248.64v-248.64H112z m503.36-96a48 48 0 0 0-48 48v344.64c0 26.496 21.504 48 48 48H960a48 48 0 0 0 48-48V615.552a48 48 0 0 0-48-48H615.36z m48 344.64v-248.64h248.64v248.64h-248.64z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={workspaceIcon} {...props}/>
}
import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";
import {StyleUtil} from "@D/utils/style-util.ts";

export const HouseIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {
    const houseIcon = () => (
        <svg className="house-icon-01" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M1081.782857 503.954286L640.073143 62.683429 610.523429 33.060571a35.986286 35.986286 0 0 0-50.761143 0L88.576 503.954286a73.069714 73.069714 0 0 0-21.504 52.516571c0.438857 40.228571 33.938286 72.411429 74.166857 72.411429h48.566857v372.150857h790.674286V628.882286h49.590857a72.777143 72.777143 0 0 0 51.785143-21.430857c13.824-13.897143 21.357714-32.182857 21.357714-51.785143a72.704 72.704 0 0 0-21.504-51.638857z m-432.64 414.939428h-128V685.641143h128v233.179428z m249.051429-372.297143v372.297143H722.285714V658.285714a45.714286 45.714286 0 0 0-45.714285-45.714285h-182.857143A45.714286 45.714286 0 0 0 448 658.285714v260.608H272.091429v-372.297143h-109.714286l422.912-422.473142 26.331428 26.331428 396.434286 396.141714H898.194286z"
                fill={props.color}></path>
        </svg>
    )
    return <Icon component={houseIcon} {...props}/>
}
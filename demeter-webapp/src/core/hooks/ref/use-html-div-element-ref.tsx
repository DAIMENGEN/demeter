import {useRef} from "react";

export const useHtmlDivElementRef = () => {
    return useRef<HTMLDivElement>(null);
}
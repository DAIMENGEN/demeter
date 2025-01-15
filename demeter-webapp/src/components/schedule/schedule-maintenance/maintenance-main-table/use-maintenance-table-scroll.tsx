import {useEffect, useMemo, useState} from "react";

export const useMaintenanceTableScroll = () => {
    const otherHeight = useMemo(() => 291, []);
    const [scroll, setScroll] = useState({x: "max-content", y: window.innerHeight - otherHeight});
    useEffect(() => {
        const resize = () => {
            const clientHeight = window.innerHeight;
            setScroll({x: "max-content", y: clientHeight - otherHeight});
        }
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [otherHeight]);
    return scroll;
}
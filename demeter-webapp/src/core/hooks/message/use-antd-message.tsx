import {message} from "antd";
import {useCallback} from "react";

export const useAntdMessage = () => {
    const [messageApi, contextHolderMessage] = message.useMessage();

    const success = useCallback((content?: string | number, duration?: number) => messageApi.open({
        type: "success",
        content: content,
        duration: duration ?? 1,
    }), [messageApi]);

    const failure = useCallback((content?: string | number, duration?: number) => messageApi.open({
        type: "error",
        content: content,
        duration: duration ?? 2,
    }), [messageApi]);

    const warning = useCallback((content?: string | number, duration?: number) => messageApi.open({
        type: "warning",
        content: content,
        duration: duration ?? 2,
    }), [messageApi]);

    return {contextHolderMessage, success, failure, warning};
}
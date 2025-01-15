import {RuleObject} from "antd/es/form";

export const useFormDateFieldRules = (required: boolean) => {
    return [
        {
            required: required
        },
        {
            pattern: /^\d{4}-\d{2}-\d{2}$/,
            message: "Date must be in YYYY-MM-DD format"
        },
        {
            validator: (_: RuleObject, value: any) => {
                if (!value) return Promise.resolve();
                const date = new Date(value);
                // 检查日期是否有效
                if (isNaN(date.getTime())) {
                    return Promise.reject("Invalid date");
                }
                // 进一步检查输入的日期是否与格式匹配
                const [year, month, day] = value.split('-');
                if (date.getFullYear() !== parseInt(year) || date.getMonth() + 1 !== parseInt(month) || date.getDate() !== parseInt(day)) {
                    return Promise.reject("Invalid date");
                }
                return Promise.resolve();
            }
        }
    ]
}
import {SelectProps} from "antd";
import {HttpService} from "@D/http/http-service.ts";
import {EmployeePayload} from "@D/http/payload/employee-payload.ts";
import {HttpPayload} from "@D/http/http-payload.ts";

export class EmployeeService extends HttpService<EmployeePayload> {

    private static instance: EmployeeService;

    public static getInstance(): EmployeeService {
        if (!EmployeeService.instance) {
            EmployeeService.instance = new EmployeeService();
        }
        return EmployeeService.instance;
    }

    public create(partialFields: Omit<EmployeePayload, keyof HttpPayload>): EmployeePayload {
        const args: ConstructorParameters<typeof EmployeePayload> = [
            this.generateId(),
            partialFields.account,
            partialFields.password,
            partialFields.employeeName,
            partialFields.email,
            partialFields.phone,
            partialFields.isActive,
        ];
        return new EmployeePayload(...args);
    }

    public loginRequest(account: string, password: string, success: (token: string) => void, failure?: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<string>(URL, {account, password}).then(success).catch(failure);
    }

    public logoutRequest(account: string, success: () => void, failure?: (error: Error) => void): void {
        const URL = "/logoutRoute";
        this.post<string>(URL, {account}).then(success).catch(failure);
    }

    public registerRequest(employee: EmployeePayload, success: (user: EmployeePayload) => void, failure?: (error: Error) => void): void {
        const URL = "/registerRoute";
        this.post<EmployeePayload>(URL, {employee}).then(success).catch(failure);
    }

    public batchRegisterRequest(employees: Array<EmployeePayload>, success: (employees: Array<EmployeePayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<EmployeePayload>>(URL, {employees}).then(success).catch(failure);
    }

    public resetPasswordRequest(newPassword: string, oldPassword: string, success: (employee: EmployeePayload) => void, failure?: (error: Error) => void): void {
        const URL = "/resetPasswordRoute";
        this.post<EmployeePayload>(URL, {newPassword, oldPassword}).then(success).catch(failure);
    }

    public getCurrentEmployeeIdRequest(success: (employeeId: string) => void, failure?: (error: Error) => void): void {
        const URL = "/getCurrentEmployeeIdRoute";
        this.get<string>(URL).then(success).catch(failure);
    }

    public getCurrentEmployeeNameRequest(success: (username: string) => void, failure?: (error: Error) => void): void {
        const URL = "/getCurrentEmployeeNameRoute";
        this.get<string>(URL).then(success).catch(failure);
    }

    public getEmployeeSelectOptionsRequest(employeeName: string, success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getEmployeeSelectOptionsRoute";
        this.post<SelectProps["options"]>(URL, {employeeName}).then(success).catch(failure);
    }
}
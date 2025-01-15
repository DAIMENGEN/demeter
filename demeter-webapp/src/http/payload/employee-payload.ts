import {HttpPayload} from "@D/http/http-payload.ts";

export class EmployeePayload implements HttpPayload {
    id: string;
    account: string;
    password: string;
    employeeName: string;
    email: string;
    phone: string;
    isActive: boolean;

    constructor(
        id: string,
        account: string,
        password: string,
        employeeName: string,
        email: string,
        phone: string,
        isActive: boolean,
    ) {
        this.id = id;
        this.account = account;
        this.password = password;
        this.employeeName = employeeName;
        this.email = email;
        this.phone = phone;
        this.isActive = isActive;
    }
}
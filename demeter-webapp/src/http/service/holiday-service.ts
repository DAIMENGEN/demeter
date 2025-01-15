import {HolidayPayload} from "@D/http/payload/holiday-payload.ts";
import {HttpService} from "@D/http/http-service.ts";
import {HttpPayload} from "@D/http/http-payload.ts";

export class HolidayService extends HttpService<HolidayPayload> {

    private static instance: HolidayService;

    public static getInstance(): HolidayService {
        if (!HolidayService.instance) {
            HolidayService.instance = new HolidayService();
        }
        return HolidayService.instance;
    }

    public create(partialFields: Omit<HolidayPayload, keyof HttpPayload>): HolidayPayload {
        const args: ConstructorParameters<typeof HolidayPayload> = [
            this.generateId(),
            partialFields.title,
            partialFields.holidayDate,
            partialFields.holidayType,
            partialFields.isRecurring,
            partialFields.countryCode,
            partialFields.description,
        ];
        return new HolidayPayload(...args);
    }

    public createHolidayRequest(holiday: HolidayPayload, success: (holiday: HolidayPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/createHolidayRoute";
        this.post<HolidayPayload>(URL, {holiday}).then(success).catch(failure);
    }

    public createHolidaysRequest(holidays: Array<HolidayPayload>, success: (holidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/createHolidaysRoute";
        this.post<Array<HolidayPayload>>(URL, {holidays}).then(success).catch(failure);
    }

    public deleteHolidaysRequest(success: (deletedHolidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidaysRoute";
        this.post<Array<HolidayPayload>>(URL).then(success).catch(failure);

    }

    public deleteHolidayByIdRequest(holidayId: string, success: (deletedHoliday: HolidayPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidayByIdRoute";
        this.post<HolidayPayload>(URL, {holidayId}).then(success).catch(failure);
    }

    public deleteHolidayByIdsRequest(holidayIds: Array<string>, success: (deletedHolidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidayByIdsRoute";
        this.post<Array<HolidayPayload>>(URL, {holidayIds}).then(success).catch(failure);
    }

    public updateHolidayRequest(holiday: HolidayPayload, success: (updatedHoliday: HolidayPayload) => void, failure?: (error: Error) => void): void {
        const URL = "/updateHolidayRoute";
        this.put<HolidayPayload>(URL, {holiday}).then(success).catch(failure);
    }

    public updateHolidaysRequest(holidays: Array<HolidayPayload>, success: (updatedHoliday: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/updateHolidaysRoute";
        this.put<Array<HolidayPayload>>(URL, {holidays}).then(success).catch(failure);
    }

    public getHolidaysRequest(success: (holidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getHolidaysRoute";
        this.get<Array<HolidayPayload>>(URL).then(success).catch(failure);
    }

    public getNationalHolidaysRequest(success: (holidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getNationalHolidaysRoute";
        this.get<Array<HolidayPayload>>(URL).then(success).catch(failure);
    }

    public getCompanyHolidaysRequest(success: (holidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getCompanyHolidaysRoute";
        this.get<Array<HolidayPayload>>(URL).then(success).catch(failure);
    }

    public getSpecialWorkdaysRequest(success: (holidays: Array<HolidayPayload>) => void, failure?: (error: Error) => void): void {
        const URL = "/getSpecialWorkdaysRoute";
        this.get<Array<HolidayPayload>>(URL).then(success).catch(failure);
    }
}
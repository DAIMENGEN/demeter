import {HolidayType} from "@D/core/constant/holiday-type.ts";
import {CountryCode} from "@D/core/constant/country-code.ts";
import {HttpPayload} from "@D/http/http-payload.ts";

export class HolidayPayload implements HttpPayload {
    id: string;
    title: string;
    holidayDate: string;
    holidayType: HolidayType;
    isRecurring: boolean;
    countryCode: CountryCode;
    description?: string;

    constructor(
        id: string,
        title: string,
        holidayDate: string,
        holidayType: HolidayType,
        isRecurring: boolean,
        countryCode: CountryCode,
        description?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.holidayDate = holidayDate;
        this.holidayType = holidayType;
        this.isRecurring = isRecurring;
        this.countryCode = countryCode;
    }
}
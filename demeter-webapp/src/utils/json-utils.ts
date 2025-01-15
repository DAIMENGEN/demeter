import {JsonObject, JsonString} from "@D/global-types";

export class JsonUtils {
    static stringify(obj: JsonObject): JsonString {
        return JSON.stringify(obj) as JsonString;
    }

    static parse(json?: JsonString): JsonObject {
        return JSON.parse(json ?? "{}");
    }
}
export type AnyType = unknown;

export type NumberDictionary = Record<string, number>;

export type StringDictionary = Record<string, string>;

export type UnknownDictionary = Record<string, AnyType>;

export type Dictionary = NumberDictionary | StringDictionary | UnknownDictionary;

export type Branded<T, B> = T & { __brand: B };

export type JsonString = Branded<string, "JsonString">;

export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

export type JsonObject = { [key: string]: JsonValue };
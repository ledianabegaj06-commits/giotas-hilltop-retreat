export type Locale = "en" | "el";
export type Localized<T = string> = Record<Locale, T>;

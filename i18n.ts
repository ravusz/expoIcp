import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "@/locales/en.json";
import pl from "@/locales/pl.json";
import { LOCALES } from "@/constants";

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
  en,
  pl,
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;

export const translate = (key: string) => i18n.t(key);

export const changeLanguage = (languageCode: string) => {
  if ([LOCALES.EN, LOCALES.PL].includes(languageCode as "en" | "pl")) {
    i18n.locale = languageCode;
    i18n.defaultLocale = languageCode;
  }
};

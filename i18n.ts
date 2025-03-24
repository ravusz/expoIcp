import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getLocales } from "expo-localization";
import en from "@/locales/en.json";
import pl from "@/locales/pl.json";
import { LOCALES } from "@/constants";

const resources = {
  [LOCALES.EN]: { translation: en },
  [LOCALES.PL]: { translation: pl },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = getLocales()?.[0]?.languageCode ?? "en";
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export const changeLanguage = async (lang: string) => {
  await AsyncStorage.setItem("language", lang);
  i18n.changeLanguage(lang);
};

export default i18n;

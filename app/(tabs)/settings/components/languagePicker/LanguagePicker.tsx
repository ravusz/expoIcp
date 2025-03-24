import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { changeLanguage, loadLanguage } from "@/i18n";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";

import Label from "@/components/form/label";

import { LOCALES } from "@/constants";

const LanguagePicker = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    loadLanguage();
  }, [i18n]);

  return (
    <View style={styles.container}>
      <Label>{t("settings.SELECT_LAGUAGE")}</Label>
      <Picker
        selectedValue={"pl"}
        onValueChange={(language) => {
          changeLanguage(language);
        }}
      >
        <Picker.Item label={t("settings.EN")} value={LOCALES.EN} />
        <Picker.Item label={t("settings.PL")} value={LOCALES.PL} />
      </Picker>
    </View>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

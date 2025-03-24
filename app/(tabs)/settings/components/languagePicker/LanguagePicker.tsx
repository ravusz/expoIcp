import React from "react";
import { StyleSheet, View } from "react-native";
import { i18n, translate, changeLanguage } from "@/i18n";
import { Picker } from "@react-native-picker/picker";

import Label from "@/components/form/label";

import { LOCALES } from "@/constants";

console.log("i18n", i18n.locale);
const LanguagePicker = () => {
  return (
    <View style={styles.container}>
      <Label>{translate("settings.SELECT_LAGUAGE")}</Label>
      <Picker
        selectedValue={i18n.locale}
        onValueChange={(language) => {
          changeLanguage(language);
        }}
      >
        <Picker.Item label={translate("settings.EN")} value={LOCALES.EN} />
        <Picker.Item label={translate("settings.PL")} value={LOCALES.PL} />
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

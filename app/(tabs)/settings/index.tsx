import React from "react";

import ScreenContainer from "@/components/screenContainer";
import Button from "@/components/button";
import { useClearCache } from "./api/mutations/useClearCache";

import LanguagePicker from "./components/languagePicker";

const SettingsScreen = () => {
  const { mutate, isPending } = useClearCache();
  return (
    <ScreenContainer>
      <LanguagePicker />
      <Button
        onPress={() => mutate()}
        isLoading={isPending}
        disabled={isPending}
      >
        Clear cache
      </Button>
    </ScreenContainer>
  );
};

export default SettingsScreen;

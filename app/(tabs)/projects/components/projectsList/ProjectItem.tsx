import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import type { ProjectResponse } from "@/app/(tabs)/projects/api/api";
import { theme } from "@/theme";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useDeleteProject } from "@/app/(tabs)/projects/api/mutations/useDeleteProject";
import IconButton from "@/components/iconButton";
import { useRouter } from "expo-router";
import ListCardItem from "@/components/list/listCardItem";

const ProjectItem = ({
  id,
  name,
  description,
}: Omit<ProjectResponse, "tasks">) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteProject();
  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      t("project.deleteConfirmation.TITLE"),
      t("project.deleteConfirmation.DESCRIPTION"),
      [
        {
          text: t("project.deleteConfirmation.CANCEL_BUTTON"),
          style: "cancel",
        },
        {
          text: t("project.deleteConfirmation.SUBMIT_BUTTON"),
          onPress: () => mutate(id),
        },
      ],
      { cancelable: true },
    );
  };

  const onEdit = () => {
    router.navigate(`/projects/${id}/editProject`);
  };

  const redirectToTasks = () => {
    router.navigate(`/projects/${id}/tasks`);
  };

  const rightSwipe = () => {
    return (
      <View style={styles.swipeContainer}>
        <IconButton onPress={onEdit} variant="info" name="pencil-outline" />
        <IconButton
          onPress={onDelete}
          variant="danger"
          name="delete-outline"
          isLoading={isPending}
        />
      </View>
    );
  };

  return (
    <ReanimatedSwipeable renderRightActions={rightSwipe}>
      <ListCardItem
        title={name}
        description={description}
        onPress={redirectToTasks}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.colors.base}
        />
      </ListCardItem>
    </ReanimatedSwipeable>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  swipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.padding.lg,
  },
});

import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import NoteInputModal from "./NoteInputModal";

const cardColors = ["#DBF3DB", "#F7F6D4", "#DCEAFC", "#EFE9F6"];

const DiaryCard = ({
  date,
  diary,
  id,
  onHandleDelete,
  onHandleUpdate,
}: {
  date: number;
  diary: string;
  id: number;
  onHandleDelete: (id: number) => void;
  onHandleUpdate?: (content: string, id: number) => void;
}) => {
  const [cardColor, setCardColor] = useState<string>("#DBF3DB");
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
  }

  useEffect(() => {
    setCardColor(getRandomColor());
  }, []);

  const copyDiary = (content: string) => {
    if (content !== null) {
      Clipboard.setStringAsync(content);
    }
    ToastAndroid.showWithGravity(
      "Diary Copied!",
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  const setUpdateId = (content: string) => {
    onHandleUpdate && onHandleUpdate(content, id);
  };

  return (
    <View
      style={{
        backgroundColor: cardColor,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        height: 180,
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          {date}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.DARK,
            opacity: 0.8,
            marginTop: 10,
          }}
        >
          {diary}
        </Text>
      </View>
      <LinearGradient
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          position: "absolute",
          bottom: 15,
          paddingLeft: 20,
          gap: 15,
          width: "100%",
          paddingTop: 50,
          borderRadius: 10,
        }}
        colors={["transparent", cardColor]}
      >
        <TouchableOpacity onPress={() => setCreateModalOpen(true)}>
          <Ionicons style={styles.iconBg} name="eye-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onHandleDelete(id)}>
          <Ionicons style={styles.iconBg} name="trash-bin-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyDiary(diary)}>
          <Ionicons style={styles.iconBg} name="copy-outline" />
        </TouchableOpacity>
      </LinearGradient>
      <NoteInputModal
        visible={createModalOpen}
        onClose={setCreateModalOpen}
        isEdit={createModalOpen}
        viewDate={String(date)}
        editDiary={diary}
        onUpdate={setUpdateId}
      />
    </View>
  );
};

export default DiaryCard;

const styles = StyleSheet.create({
  iconBg: {
    backgroundColor: "#fff",
    fontSize: 20,
    padding: 10,
    borderRadius: 50,
  },
});

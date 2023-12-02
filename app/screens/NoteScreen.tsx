import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import DiaryCard from "../components/DiaryCard";
import FloatingActions from "../components/FloatingActions";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteScreen = ({ username }: { username: string }) => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [diaries, setDiaries] = useState<any>([]);
  const onHandleSubmit = async (diary: string) => {
    const time = new Date().getTime();
    const data = { id: Date.now(), diary, time, date: time };
    const updatedDiaries = [...diaries, data];
    setDiaries(updatedDiaries);
    await AsyncStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };
  const findDiaries = async () => {
    const results = await AsyncStorage.getItem("diaries");
    if (results !== null) setDiaries(JSON.parse(results));
    console.log(results);
  };

  const onHandleDelete = async (id: number) => {
    const updatedDiaries = diaries.filter((e: { id: number }) => e.id !== id);
    setDiaries(updatedDiaries);
    await AsyncStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };

  useEffect(() => {
    findDiaries();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View>
          <Text style={styles.myDiaryTitle}>Hey 👋, {username}</Text>
          <Text style={styles.subtitle}>
            Let's write something on your dear diary
          </Text>
        </View>
        <TextInput
          style={styles.searchInput}
          cursorColor={"#000"}
          placeholder="Search by date"
        />
        {diaries.map((item: any, i: number) => {
          return (
            <View key={i} style={{ marginTop: 20 }}>
              <DiaryCard
                onHandleDelete={onHandleDelete}
                id={item.id}
                date={item.date}
                diary={item.diary}
              />
            </View>
          );
        })}
      </View>
      <FloatingActions onCreateClick={() => setCreateModalOpen(true)} />
      <NoteInputModal
        visible={createModalOpen}
        onClose={setCreateModalOpen}
        onSubmit={onHandleSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#464646",
    paddingHorizontal: 20,
    height: 45,
    fontSize: 16,
    borderRadius: 50,
    marginTop: 20,
  },
  myDiaryTitle: {
    fontSize: 28,
    fontWeight: "600",
    opacity: 0.9,
    marginTop: 30,
  },
  subtitle: {
    color: colors.DARK,
    opacity: 0.7,
  },
});

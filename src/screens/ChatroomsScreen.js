import React from "react";
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from "react-native";
import ChatroomListItem from "../components/ChatroomListItem";

const chatrooms = [
  {
    id: 1,
    name: "Books 📚",
    description: "Hi, and welcome to the hub of book lovers!",
  },
  {
    id: 2,
    name: "Coding 💻",
    description: "<Hello World, room compiled successfully!/>",
  },
  {
    id: 3,
    name: "Running 👟",
    description: "Hey! Put on the shoes and go for it!",
  },
];

export default function ChatroomsScreen({ navigation }) {
  const navigateToChatroom = (chatroomId) =>
    navigation.navigate("Chatroom", { chatroomId: chatroomId });

  const renderItem = ({ item }) => (
    <ChatroomListItem
      name={item.name}
      description={item.description}
      chatroomId={item.id}
      navigateToChatroom={navigateToChatroom}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatrooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

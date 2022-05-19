import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import ChatroomListItem from "../components/ChatroomListItem";
import { getChatrooms } from "../data/chatrooms";

export default function ChatroomsScreen({ navigation }) {
  const [chatrooms, setChatrooms] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const chatrooms = await getChatrooms();
    setChatrooms(chatrooms);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        onRefresh={async () => {
          setRefreshing(true);
          await fetchData();
          setRefreshing(false);
        }}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1f1ff",
    paddingVertical: 8,
  },
});

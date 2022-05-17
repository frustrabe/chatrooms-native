import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { getChatroom } from "../data/chatrooms";
import Messages from "../components/Messages";
import Toolbox from "../components/Toolbox";

export default function ChatroomScreen({ route }) {
  const { chatroomId } = route.params;

  const [chatroom, setChatroom] = useState(null);

  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Not logged in !</Text>
      </View>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const chatroom = await getChatroom(chatroomId);
      setChatroom(chatroom);
    };
    fetchData();
  }, [chatroomId]);

  if (!chatroom) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Messages
        chatroom={chatroom} />

      <Toolbox />
    </View>
  );

  return <SafeAreaView></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bubble: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: '#7C83FD',
  }
});

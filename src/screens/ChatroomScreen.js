import React, { useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View, Platform } from "react-native";

import { getChatroom } from "../data/chatrooms";
import Messages from "../components/Messages";
import Toolbox from "../components/Toolbox";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default function ChatroomScreen({ route }) {
  const { chatroomId } = route.params;

  const [chatroom, setChatroom] = useState(null);
  const [user] = useAuthState(auth);

  const flatListRef = useRef();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Not logged in !</Text>
      </View>
    );
  }

  const fetchData = async () => {
    const chatroom = await getChatroom(chatroomId);
    setChatroom(chatroom);
  };

  useEffect(() => {
    fetchData();
  }, [chatroomId]);

  useEffect(() => {
    if (flatListRef.current)
      flatListRef.current.scrollToEnd({ animated: true });
  }, [chatroom]);

  if (!chatroom) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "RobotoMono_400Regular" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.inner}>
      <Messages chatroom={chatroom} ref={flatListRef} />
      <Toolbox
        fetchData={fetchData}
        chatroomId={chatroomId}
        ref={flatListRef}
      />

      {Platform.OS === "ios" && <KeyboardSpacer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
  },
});

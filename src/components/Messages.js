import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Message from "./Message";
import Toolbox from "./Toolbox";
import { useRef } from "react";

export default function Messages({ chatroom }) {
  const { name, messages } = chatroom;

  const renderItem = ({ item }) => (
    <Message
      name={item.name}
      text={item.text}
      uid={item.uid}
      created_at={item.created_at}
    />
  );

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
    />
  );
}

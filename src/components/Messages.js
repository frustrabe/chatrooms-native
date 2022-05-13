import { StyleSheet, Text, View, FlatList } from "react-native";
import Message from "./Message";
import Toolbox from "./Toolbox";

export default function Messages({ chatroom }) {
  const { name, messages } = chatroom;

  const renderItem = ({ item }) => (
    <Message name={item.name} text={item.text} />
  );

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

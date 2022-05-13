import { StyleSheet, TextInput, View, Pressable, Text } from "react-native";
import { useState } from "react";
import { saveMessage } from "../data/chatrooms";

export default function Toolbox({ chatroomId }) {
  const [text, onChangeText] = useState("");

  return (
    <View styles={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type something.."
      />
      <Pressable
        style={styles.button}
        onPress={() => saveMessage(text, chatroomId)}
      >
        <Text>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    width: "66.66%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    color: "red",
    width: "32.33%",
    height: 40,
  },
});

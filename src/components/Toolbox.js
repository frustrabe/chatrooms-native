import { StyleSheet, TextInput, View, Pressable, Text, } from "react-native";
import { useState } from "react";
import { saveMessage } from "../data/chatrooms";
import { Ionicons } from '@expo/vector-icons';

export default function Toolbox({ chatroomId }) {
  const [text, onChangeText] = useState("");

  return (
    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <TextInput style={{
        margin: 16,
        padding: 8,
        width: "80%",
        borderWidth: 0.5,
        borderRadius: 8,
        fontFamily: 'RobotoMono_400Regular'
      }}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type something.."
      />
      <Ionicons
        name="send"
        size={28}
        color="black"
        onPress={() => saveMessage(text, chatroomId)}
      />
    </View>
  );
}
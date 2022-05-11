import { StyleSheet, Text, View } from "react-native";

export default function ChatroomScreen({ route }) {
  const { chatroomId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Chatroom screen {chatroomId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

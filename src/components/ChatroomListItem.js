import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function ChatroomListItem({
  name,
  description,
  chatroomId,
  navigateToChatroom,
}) {
  return (
    <TouchableHighlight onPress={() => navigateToChatroom(chatroomId)}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 24,
  },
});

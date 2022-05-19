import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ChatroomListItem({
  name,
  description,
  chatroomId,
  navigateToChatroom,
}) {
  return (
    <TouchableHighlight
      color="#fff"
      activeOpacity={0.5}
      underlayColor="#fff"
      onPress={() => navigateToChatroom(chatroomId)}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Entypo
          style={styles.chevron}
          name="chevron-right"
          size={28}
          color="white"
        />
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#256DA5",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: "auto",
    borderColor: "#E3EFFF",
    fontFamily: "RobotoMono_400Regular",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontFamily: "RobotoMono_500Medium",
  },
  description: {
    flex: 1,
    fontSize: 18,
    color: "white",
    fontFamily: "RobotoMono_400Regular",
    maxWidth: "90%",
  },
  chevron: {
    alignSelf: "flex-end",
  },
});

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
      color="red"
      activeOpacity={0.63333}
      underlayColor="#e1f1ff"
      onPress={() => navigateToChatroom(chatroomId)}
    >
      <View style={styles.roomWrapper}>
        <View style={styles.room}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.chevron}>
          <Entypo name="chevron-right" size={28} color="#569ED6" />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  roomWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  room: {
    flexDirection: "column",
    backgroundColor: "#256DA5",
    alignSelf: "flex-start",
    width: "90%",
    padding: 10,
    marginVertical: 8,
    marginLeft: 8,
    borderRadius: 8,
    borderWidth: 1,
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
    justifyContent: "center",
    width: "10%",
  },
});

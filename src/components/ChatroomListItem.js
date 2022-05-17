import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function ChatroomListItem({
  name,
  description,
  chatroomId,
  navigateToChatroom,
}) {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#7FB4FF"
      onPress={() => navigateToChatroom(chatroomId)}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#7FB4FF",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E3EFFF",
    fontFamily: 'RobotoMono_400Regular',

  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'RobotoMono_500Medium',
  },
  description: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'RobotoMono_400Regular',
  },
});

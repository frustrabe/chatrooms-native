import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View, Image } from "react-native";
import { auth } from "../firebase";

export default function Message({
  name,
  text,
  uid,
  avatar,
  humanizedCreatedAt,
}) {
  const [user] = useAuthState(auth);

  if (user.uid === uid) {
    return (
      <View style={[styles.message, styles.me]}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{humanizedCreatedAt}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.message, styles.them]}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatar,
        }}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{humanizedCreatedAt}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  me: {
    alignSelf: "flex-end",
    backgroundColor: "#006AFF",
  },
  them: {
    alignSelf: "flex-start",
    backgroundColor: "#808080",
  },
  message: {
    width: "60%",

    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    fontFamily: "RobotoMono_400Regular",
  },
  title: {
    fontSize: 10,
    justifyContent: "center",
    fontFamily: "RobotoMono_400Regular",
  },
  text: {
    flex: 1,
    fontSize: 20,
    includeFontPadding: false,
    textAlignVertical: "center",
    color: "white",
    fontFamily: "RobotoMono_400Regular",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

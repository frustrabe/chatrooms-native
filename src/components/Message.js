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

  return (
    <View
      style={[
        styles.message,
        user.uid === uid ? styles.meAlign : styles.themAlign,
      ]}
    >
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />
      </View>
      <View
        style={[
          styles.contentWrapper,
          user.uid === uid ? styles.meBackground : styles.themBackground,
        ]}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{humanizedCreatedAt}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    width: 40,
    marginRight: 8,
  },
  contentWrapper: {
    flexGrow: 1,
    borderRadius: 20,
    padding: 10,
    maxWidth: "84%",
    backgroundColor: "red",
  },
  meAlign: {
    alignSelf: "flex-end",
  },
  meBackground: {
    backgroundColor: "#255AA5",
  },
  themAlign: {
    alignSelf: "flex-start",
  },
  themBackground: {
    backgroundColor: "#9DD2FF",
  },
  message: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    marginVertical: 8,
    paddingHorizontal: 10,
    fontFamily: "RobotoMono_400Regular",
  },
  name: {
    fontSize: 14,
    color: "white",
    paddingBottom: 4,
    justifyContent: "center",
    fontFamily: "RobotoMono_400Regular",
  },
  time: {
    fontSize: 10,
    color: "white",
    justifyContent: "center",
    fontFamily: "RobotoMono_400Regular_Italic",
  },
  text: {
    fontSize: 18,
    includeFontPadding: false,
    maxWidth: "auto",
    color: "white",
    fontFamily: "RobotoMono_400Regular",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
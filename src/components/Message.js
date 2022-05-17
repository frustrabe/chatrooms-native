import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "../firebase";

export default function Message({ name, text, uid, created_at }) {
  const [user] = useAuthState(auth);

  if (user.uid === uid) {
    return (
      <View style={[styles.message, styles.me]}>
        <Text style={styles.title}>{uid}</Text>
        <Text style={styles.title}>{created_at}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.message, styles.them]}>
      <Text style={styles.title}>{uid}</Text>
      <Text style={styles.title}>{created_at}</Text>
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
});

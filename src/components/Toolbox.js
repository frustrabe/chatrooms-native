import { TextInput, View, StyleSheet } from "react-native";
import { useState, forwardRef } from "react";
import { saveMessage } from "../data/chatrooms";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Toolbox = forwardRef((props, ref) => {
  const { chatroomId } = props;
  const [text, setText] = useState("");
  const [user] = useAuthState(auth);

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        onChangeText={setText}
        value={text}
        placeholder="Type something.."
      />
      <AntDesign
        style={styles.picture}
        name="picture"
        size={30}
        color="#255AA5"
      />
      <Ionicons
        style={styles.send}
        name="send"
        size={30}
        color="#255AA5"
        onPress={async () => {
          await saveMessage(text, chatroomId, user.photoURL, user.displayName);
          setText("");
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput: {
    margin: 12,
    padding: 8,
    width: "70%",
    borderWidth: 0.5,
    borderRadius: 8,
    fontFamily: "RobotoMono_400Regular",
  },
  picture: {
    width: "10%",
    margin: 4,
    padding: 4
  },
  send: {
    width: "10%",
    margin: 4,
    padding: 4
  },
})

export default Toolbox;
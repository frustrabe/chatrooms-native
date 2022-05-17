import { TextInput, View } from "react-native";
import { useState, forwardRef } from "react";
import { saveMessage } from "../data/chatrooms";
import { Ionicons } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Toolbox = forwardRef((props, ref) => {
  const { chatroomId, fetchData } = props;
  const [text, setText] = useState("");
  const [user] = useAuthState(auth);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        style={{
          margin: 16,
          padding: 8,
          width: "80%",
          borderWidth: 0.5,
          borderRadius: 8,
          fontFamily: "RobotoMono_400Regular",
        }}
        onChangeText={setText}
        value={text}
        placeholder="Type something.."
      />
      <Ionicons
        name="send"
        size={28}
        color="black"
        onPress={async () => {
          await saveMessage(text, chatroomId, user.photoURL, user.displayName);
          setText("");
          await fetchData();
        }}
      />
    </View>
  );
});

export default Toolbox;

import { TextInput, View, StyleSheet } from "react-native";
import { useState, forwardRef } from "react";
import { saveMessage, sendImage } from "../data/chatrooms";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Toolbox = forwardRef((props, ref) => {
  const { chatroomId } = props;
  const [text, setText] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      sendImage(result.uri, chatroomId);
    }
  };

  return (
    <>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={setText}
          value={text}
          placeholder="Type something.."
        />
        <AntDesign
          onPress={pickImage}
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
            if (text.length > 0) {
              await saveMessage(text, chatroomId, null);
              setText("");
            }
          }}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
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
    padding: 4,
  },
  send: {
    width: "10%",
    margin: 4,
    padding: 4,
  },
});

export default Toolbox;

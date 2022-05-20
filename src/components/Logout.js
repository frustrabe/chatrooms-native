import { Text, Pressable } from "react-native";
import { auth } from "../firebase";

export default function Logout({ navigation }) {
  return (
    <Pressable
      onPress={async () => {
        await auth.signOut();
        navigation.navigate("Login");
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoMono_700Bold",
          fontSize: 18,
          color: "#fff",
        }}
      >
        Log out
      </Text>
    </Pressable>
  );
}

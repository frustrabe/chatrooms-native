import { Text, Pressable } from "react-native";
import { auth } from "../firebase";

export default function Logout({ navigation }) {
  return (
    <Pressable
      onPress={async () => {
        // await auth.signOut();
        navigation.navigate("Home");
      }}
    >
      <Text>Log out</Text>
    </Pressable>
  );
}

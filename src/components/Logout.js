import { RobotoMono_300Light } from "@expo-google-fonts/roboto-mono";
import { Text, Pressable } from "react-native";

export default function Logout({ navigation }) {
  return (
    <Pressable
      onPress={async () => {
        // await auth.signOut();
        navigation.navigate("Home");
      }}
    >
      <Text style={{
        fontFamily: "RobotoMono_500Medium",
        color: "#fff",
      }}>
        Log out
      </Text>
    </Pressable>
  );
}

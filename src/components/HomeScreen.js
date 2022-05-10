import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button
        title="Go to Chatrooms"
        onPress={() => navigation.navigate("Chatrooms")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
import { StyleSheet, Text, View } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default function Message({ name, text }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#006AFF", //#001D6E//
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20
  },
  title: {
    fontSize: 10,
    justifyContent: "center",

  },
  text: {
    flex: 1,
    fontSize: 20,
    includeFontPadding: false,
    textAlignVertical: "center",
    color: 'white',
  },
});

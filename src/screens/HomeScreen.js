import { useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Google from "expo-auth-session/providers/google";

export default function HomeScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "737316338965-fg4goi2fr9nbigi598araj19okielbmu.apps.googleusercontent.com",
  });

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (response && response.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {user ? (
        <Text>Logged in as {user.email}</Text>
      ) : (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      )}

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

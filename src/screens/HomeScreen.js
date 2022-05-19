import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Google from "expo-auth-session/providers/google";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

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

  useEffect(() => {
    if (user) {
      navigation.navigate("Chatrooms");
    }
  }, [user]);

  return (
    <View style={styles.viewMain}>
      <View style={styles.logInView}>
        <Text style={styles.logInText}>
          Log In with:
        </Text>
      </View>

      <View
        style={styles.iconGoogle}>
        <Pressable
          onPress={() => {
            promptAsync();
          }}
        >
          <AntDesign name="google" size={50} color="#DB4437" />
        </Pressable>
      </View>

      <View
        style={styles.iconFacebook}>
        <Pressable onPress={() => onPressFunction}>
          <AntDesign name="facebook-square" size={50} color="royalblue" />
        </Pressable>
      </View>

      {user ? (
        <Text
          style={styles.loggedUserText}>
          Logged in as: {user.email}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#569ED6",
  },
  logInView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  logInText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#fff",
    padding: 16,
  },
  iconGoogle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    margin: 8,
    backgroundColor: "#fff", //#F4B400
    borderRadius: 8,
  },
  iconFacebook: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  loggedUserText: {
    fontFamily: "RobotoMono_500Medium",
    padding: 16,
    color: "#fff"
  },
})
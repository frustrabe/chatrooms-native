import { useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import { AntDesign } from '@expo/vector-icons';

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
      navigation.navigate("Chatrooms")
    }
  }, [user])




  return (

    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}>

      <View style={{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}>
        <Text style={{ fontWeight: "bold" }}>
          Log In with:
        </Text>
      </View>

      <View style={{

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}>
        <Pressable onPress={() => onPressFunction}>
          <AntDesign
            name="google"
            size={50}
            color="#DB4437"
          />
        </Pressable>

        <Pressable onPress={() => onPressFunction}>
          <AntDesign
            name="facebook-square"
            size={50}
            color="royalblue"
          />
        </Pressable>
      </View>

      {user ? (
        <Text style={{
          fontWeight: "bold",
          padding: 20,
        }}>
          Logged in as: {user.email}
        </Text>
      ) : (

        <Pressable
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}>
        </Pressable>
      )}
    </View>
  );
}

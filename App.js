import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ChatroomsScreen from "./src/screens/ChatroomsScreen";
import ChatroomScreen from "./src/screens/ChatroomScreen";
import * as WebBrowser from "expo-web-browser";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();


export default function App() {

  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Chatrooms" component={ChatroomsScreen} />
          <Stack.Screen name="Chatroom" component={ChatroomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
}
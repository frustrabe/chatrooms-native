import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ChatroomsScreen from "./src/screens/ChatroomsScreen";
import ChatroomScreen from "./src/screens/ChatroomScreen";
import * as WebBrowser from "expo-web-browser";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_700Bold,
  RobotoMono_400Regular_Italic,
} from "@expo-google-fonts/roboto-mono";
import Logout from "./src/components/Logout";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
    RobotoMono_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#569ED6",
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "RobotoMono_700Bold",
              color: "#fff",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Log In",
            }}
          />
          <Stack.Screen
            name="Chatrooms"
            component={ChatroomsScreen}
            options={({ navigation }) => ({
              headerLeft: () => <></>,
              headerRight: () => <Logout navigation={navigation} />,
              title: "Chatrooms",
            })}
          />
          <Stack.Screen
            name="Chatroom"
            component={ChatroomScreen}
            options={{
              title: "Chatroom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

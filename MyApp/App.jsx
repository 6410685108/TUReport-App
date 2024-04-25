import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import CreatePost from "./app/tabs/CreatePost";
import Finish from "./app/tabs/Finish";
import Profile from "./app/tabs/Profile";
import QandA from "./app/tabs/QandA";
import { Image,StyleSheet } from "react-native";

import HomeNavigator from "./app/navigator/HomeNavigator";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Authenticated"
            component={AuthenticatedScreens}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );
}

// Add more tap here
function AuthenticatedScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: styles.tabBarActiveTintColor,
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
        tabBarActiveBackgroundColor: styles.tabBarActiveBackgroundColor,
        tabBarStyle: {
          display: "flex",
        },
      }}
    >
      <Tab.Screen 
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./app/picture/home.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="Finish"
        component={Finish}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./app/picture/finish.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./app/picture/createpost.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="QandA"
        component={QandA}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./app/picture/qa_icon.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./app/picture/user.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      />
    </Tab.Navigator>
  );
}

let styles ;
let theme = 'dark'
if (theme == 'light'){
  styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: 'white',
    },
    tabBarActiveBackgroundColor: 'black',
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black"
  });
}else if(theme == "dark"){
  styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: '#111111',
    },
    tabBarActiveBackgroundColor: 'white',
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "white"
  });
}

import { useEffect, useState , useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import CreatePost from "./app/tabs/CreatePost";
import QandA from "./app/tabs/QandA";
import Pending from "./app/tabsAdmin/Pending";
import Approved from "./app/tabsAdmin/Approved";
import { Image,StyleSheet } from "react-native";
import { SettingProvider , SettingContext } from "./app/system/setting";
import { data } from './app/system/data';
import HomeNavigator from "./app/navigator/HomeNavigator";
import ProfileNavigator from "./app/navigator/ProfileNavigator";
import FinishNavigator from "./app/navigator/FinishNavigator";
import AdminNavigator from "./app/navigator/AdminNavigator";
import InProgress from "./app/tabsAdmin/InProgress";
import Waiting from "./app/tabsAdmin/Waiting";

import { db } from "./app/system/db";

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
    <SettingProvider>
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
    </SettingProvider>
  );
}

// Add more tap here
function AuthenticatedScreens() {
  const { setting } = useContext(SettingContext);
  const { theme , language } = setting;
  const [role, setRole] = useState("user");
  const styles = theme == 'light' ? lightStyle : darkStyle;
  const getRole = async () => {
    const userrole = await db.getUserRole();
    setRole(userrole);
  }
  useEffect(() => {
    getRole();
  }, [role]);
  
  if (role == "admin") {
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
          name="Pending"
          component={Pending}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/Pending.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Approved"
          component={Approved}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/Approved.png")}
                style={{ width: size, height: size}}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="INProgress"
          component={InProgress}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/Inprogress.png")}
                style={{ width: size, height: size}}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Waiting"
          component={Waiting}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/Waiting.png")}
                style={{ width: size, height: size}}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Logout"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/exit.png")}
                style={{ width: size, height: size}}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              data.logout();
            },
          })}
        />
      </Tab.Navigator>
    );
  } else {
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
          name={language === 'EN' ? "HOME" : "หน้าหลัก"}
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
          name={language === 'EN' ? "Status" : "สถานะ"}
          component={FinishNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./app/picture/status_b.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name={language === 'EN' ? "CREATE POST" : "สร้างโพสต์"}
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
          name={language === 'EN' ? "Q & A" : "ช่วยเหลือ"}
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
          name={language === 'EN' ? "PROFILE" : "โปรไฟล์"}
          component={ProfileNavigator}
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
}

const lightStyle = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: 'white',
    },
    tabBarActiveBackgroundColor: 'gray',
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black"
});
const darkStyle = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: '#111111',
    },
    tabBarActiveBackgroundColor: 'white',
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "white"
  });


import React, { useEffect, useState , useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import CreatePost from "./app/tabs/CreatePost";
import QandA from "./app/tabs/QandA";
import Pending from "./app/tabsAdmin/Pending";
import Approved from "./app/tabsAdmin/Approved";
import { Image, ViewStyle, ImageStyle } from "react-native";
import { SettingProvider , SettingContext } from "./app/system/setting";
import { data } from './app/system/data';
import HomeNavigator from "./app/navigator/HomeNavigator";
import ProfileNavigator from "./app/navigator/ProfileNavigator";
import FinishNavigator from "./app/navigator/FinishNavigator";
import AdminNavigator from "./app/navigator/AdminNavigator";
import InProgress from "./app/tabsAdmin/InProgress";
import Waiting from "./app/tabsAdmin/Waiting";

import { db } from "./app/system/db";

// Tab icon components - defined outside to avoid recreation on each render
interface TabIconProps {
  focused?: boolean;
  color: string;
  size: number;
}

const PendingIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/Pending.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const ApprovedIcon: React.FC<TabIconProps> = ({ focused: _focused, color: _color, size }) => (
  <Image
    source={require("./app/picture/Approved.png")}
    style={{ width: size, height: size } as ImageStyle}
  />
);

const InProgressIcon: React.FC<TabIconProps> = ({ focused: _focused, color: _color, size }) => (
  <Image
    source={require("./app/picture/Inprogress.png")}
    style={{ width: size, height: size } as ImageStyle}
  />
);

const WaitingIcon: React.FC<TabIconProps> = ({ focused: _focused, color: _color, size }) => (
  <Image
    source={require("./app/picture/Waiting.png")}
    style={{ width: size, height: size } as ImageStyle}
  />
);

const ExitIcon: React.FC<TabIconProps> = ({ focused: _focused, color: _color, size }) => (
  <Image
    source={require("./app/picture/exit.png")}
    style={{ width: size, height: size } as ImageStyle}
  />
);

const HomeIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/home.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const StatusIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/status_b.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const CreatePostIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/createpost.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const QandAIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/qa_icon.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const ProfileIcon: React.FC<TabIconProps> = ({ focused: _focused, color, size }) => (
  <Image
    source={require("./app/picture/user.png")}
    style={{ width: size, height: size, tintColor: color } as ImageStyle}
  />
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

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
function AuthenticatedScreens(): JSX.Element {
  const { setting } = useContext(SettingContext);
  const { theme , language } = setting;
  const [role, setRole] = useState<string>("user");
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
            tabBarIcon: PendingIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Approved"
          component={Approved}
          options={{
            tabBarIcon: ApprovedIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="INProgress"
          component={InProgress}
          options={{
            tabBarIcon: InProgressIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Waiting"
          component={Waiting}
          options={{
            tabBarIcon: WaitingIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name="Logout"
          component={AdminNavigator}
          options={{
            tabBarIcon: ExitIcon,
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
            tabBarIcon: HomeIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name={language === 'EN' ? "Status" : "สถานะ"}
          component={FinishNavigator}
          options={{
            tabBarIcon: StatusIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name={language === 'EN' ? "CREATE POST" : "สร้างโพสต์"}
          component={CreatePost}
          options={{
            tabBarIcon: CreatePostIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name={language === 'EN' ? "Q & A" : "ช่วยเหลือ"}
          component={QandA}
          options={{
            tabBarIcon: QandAIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
        <Tab.Screen
          name={language === 'EN' ? "PROFILE" : "โปรไฟล์"}
          component={ProfileNavigator}
          options={{
            tabBarIcon: ProfileIcon,
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        />
      </Tab.Navigator>
    );
  }
}

interface TabStyles {
  tabBarStyle: ViewStyle;
  tabBarActiveBackgroundColor: string;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
}

const lightStyle: TabStyles = {
  tabBarStyle: {
    backgroundColor: 'white',
  },
  tabBarActiveBackgroundColor: 'gray',
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "black"
};

const darkStyle: TabStyles = {
  tabBarStyle: {
    backgroundColor: '#111111',
  },
  tabBarActiveBackgroundColor: 'white',
  tabBarActiveTintColor: "black",
  tabBarInactiveTintColor: "white"
};

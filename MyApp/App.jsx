import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/tabs/Home';
import CreatePost from './app/tabs/CreatePost';
import Finish from './app/tabs/Finish';
import Profile from './app/tabs/Profile';
import QandA from './app/tabs/QandA';

import Test from './app/screens/Test';

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
            <Stack.Screen
              name="Test"
              component={Test}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// Add more tap here
function AuthenticatedScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Finish" component={Finish} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="QandA" component={QandA} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>

  );
}



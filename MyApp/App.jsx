import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import CreatePost from './app/tabs/CreatePost';
import Finish from './app/tabs/Finish';
import Profile from './app/tabs/Profile';
import Inpost from './app/screens/Inpost';
import QandA from './app/tabs/QandA';
import { Image } from 'react-native';

import Test from './app/screens/Test';
import TestJsx from './app/screens/TestJsx';
import HomeNavigator from './app/navigator/HomeNavigator';

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
            <Stack.Screen
              name="TestJsx"
              component={TestJsx}
              options={{ headerShown: true }}
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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{ 
        tabBarIcon: ({focused, color, size}) => (
        <Image 
          source={require('./app/picture/home.png')} 
          style={{width: size, height: size, tintColor: color}} 
        />
      ),
        headerShown: false
  }} />
      <Tab.Screen name="Finish" component={Finish} options={{ 
        tabBarIcon: ({focused, color, size}) => (
        <Image 
          source={require('./app/picture/finish.png')} 
          style={{width: size, height: size, tintColor: color}} 
        />
      ),
      headerShown: false
  }}/>
      <Tab.Screen name="CreatePost" component={CreatePost} options={{ 
        tabBarIcon: ({focused, color, size}) => (
        <Image 
          source={require('./app/picture/createpost.png')} 
          style={{width: size, height: size, tintColor: color}} 
        />
      ),
      headerShown: false
  }}/>
      <Tab.Screen name="QandA" component={QandA} options={{ 
        tabBarIcon: ({focused, color, size}) => (
        <Image 
          source={require('./app/picture/qa_icon.png')} 
          style={{width: size, height: size, tintColor: color}} 
        />
      ),
      headerShown: false
  }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ 
        tabBarIcon: ({focused, color, size}) => (
        <Image 
          source={require('./app/picture/user.png')} 
          style={{width: size, height: size, tintColor: color}} 
        />
      ),
      headerShown: false
  }}/>
    </Tab.Navigator>

  );
}



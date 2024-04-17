import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';

const Stack = createNativeStackNavigator();


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
      <Stack.Navigator initialRouteName='Home'>
        {user ? (
          <Stack.Screen name='Home' component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          </>
        )}
      </Stack.Navigator>
  </NavigationContainer>
  );
}

import React , { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import AdminScreen from './Screen/AdminScreen';
import AdminInitDatabase from './Screen/AdminInitDatabase';
import useDatabase from './dbManager/useDatabase';
import { AuthProvider } from './Screen/system/Authenticate';

const Stack = createStackNavigator();

const App = () => {
  const databaseInitialized = useDatabase();
  useEffect(() => {
    console.log('Database initialized:', databaseInitialized);
  }, [databaseInitialized]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="AdminInitDatabase" component={AdminInitDatabase} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

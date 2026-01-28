import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../tabs/Home';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';
import Notification from '../screens/Notification';
import React from 'react';
import { PostData } from '../system/db';

type HomeStackParamList = {
  Home2: undefined;
  Inpost: { postInfo: PostData };
  Posts: { option: string };
  Notification: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Home2'>
      <Stack.Screen
        name="Home2"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Inpost"
        component={Inpost as any}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Posts"
        component={Posts as any}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

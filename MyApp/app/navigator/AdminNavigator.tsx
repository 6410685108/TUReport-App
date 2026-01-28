import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inpost from '../componentsAdmin/Inpost';
import Posts from '../componentsAdmin/Posts';
import Notification from '../screens/Notification';
import Pending from '../tabsAdmin/Pending';
import React from 'react';
import { PostData } from '../system/db';

type AdminStackParamList = {
  Pending: undefined;
  InpostAdmin: { postInfo: PostData };
  Posts: { option: string; status: string };
  Notification: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Pending'>
      <Stack.Screen
        name="Pending"
        component={Pending}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InpostAdmin"
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

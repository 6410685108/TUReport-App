import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from '../components/Posts';
import Profile from '../tabs/Profile';
import Inpost from '../screens/Inpost';
import SettingInput from '../screens/SettingInput';
import EditInput from '../screens/EditInput';
import PinInput from '../screens/PinInput';
import React from 'react';
import { PostData } from '../system/db';

type ProfileStackParamList = {
  Profile2: undefined;
  Inpost: { postInfo: PostData };
  Posts: { option: string };
  Setting: undefined;
  Edit: undefined;
  Pin: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Profile2'>
      <Stack.Screen
        name="Profile2"
        component={Profile}
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
        name="Setting"
        component={SettingInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={EditInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pin"
        component={PinInput}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

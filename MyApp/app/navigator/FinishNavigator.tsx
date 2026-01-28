import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finish from '../tabs/Finish';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';
import React from 'react';
import { PostData } from '../system/db';

type FinishStackParamList = {
  Finish2: undefined;
  Inpost: { postInfo: PostData };
  Posts: { option: string };
};

const Stack = createNativeStackNavigator<FinishStackParamList>();

export default function FinishNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Finish2'>
      <Stack.Screen
        name="Finish2"
        component={Finish}
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
    </Stack.Navigator>
  );
}

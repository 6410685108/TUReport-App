import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from '../components/Posts';
import Profile from '../tabs/Profile';
import Inpost from '../screens/Inpost';
import SettingInput from '../screens/SettingInput';
import EditInput from '../screens/EditInput';
import PinInput from '../screens/PinInput';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
    return (
            <Stack.Navigator initialRouteName='Profile2'>
                <Stack.Screen
                    name="Profile2"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Inpost"
                    component={Inpost}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Posts"
                    component={Posts}
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
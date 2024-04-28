import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inpost from '../componentsAdmin/Inpost';
import Posts from '../componentsAdmin/Posts';
import Notification from '../screens/Notification';
import Pending from '../tabsAdmin/Pending';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
    return (
            <Stack.Navigator initialRouteName='Pending'>
                <Stack.Screen
                    name="Pending"
                    component={Pending}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="InpostAdmin"
                    component={Inpost}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Posts"
                    component={Posts}
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';
import Notification from '../screens/Notification';
import Pending from '../tabsAdmin/Pending';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
            <Stack.Navigator initialRouteName='Pending'>
                <Stack.Screen
                    name="Pending"
                    component={Pending}
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
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        
  
    );
  }
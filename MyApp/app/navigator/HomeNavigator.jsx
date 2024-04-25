import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../tabs/Home';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';
import Notification from '../screens/Notification';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home2"
                    component={Home}
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
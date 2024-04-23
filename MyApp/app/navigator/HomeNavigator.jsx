import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../tabs/Home';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
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
            </Stack.Navigator>
        
  
    );
  }
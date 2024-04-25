import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finish from '../tabs/Finish';
import Inpost from '../screens/Inpost';
import Posts from '../components/Posts';

const Stack = createNativeStackNavigator();

export default function FinishNavigator() {
    return (
            <Stack.Navigator initialRouteName='Finish2'>
                <Stack.Screen
                    name="Finish2"
                    component={Finish}
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
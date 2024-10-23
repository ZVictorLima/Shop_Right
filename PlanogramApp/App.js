import { View, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionScreen from './components/SelectionScreen';
import DepartmentScreen from './components/DepartmentScreen';
import Login from './components/Login';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
        <Stack.Screen name="DepartmentScreen" component={DepartmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



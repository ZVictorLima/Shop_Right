import { View, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from './components/AdminScreen';
import AdminControls from './components/AdminControls';
import SelectionScreen from './components/SelectionScreen';
import DepartmentScreen from './components/DepartmentScreen';
import Login from './components/Login';
import UploadPage from './components/UploadPage';
import ManagePage from './components/ManagePage';
import EditPage from './components/EditPage';
import RowEntry from './components/RowEntry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{ headerBackTitle: 'Options', headerTitle: 'Departments' }}/>
        <Stack.Screen name="DepartmentScreen" component={DepartmentScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTitle: 'Options'}} />
        <Stack.Screen name="AdminControls" component={AdminControls} options={{ headerBackTitle: 'Options', headerTitle: 'Controls' }}/>
        <Stack.Screen name="UploadPage" component={UploadPage} options={{ headerBackTitle: 'Controls' }}/>
        <Stack.Screen name="ManagePage" component={ManagePage} options={{ headerBackTitle: 'Controls' }}/>
        <Stack.Screen name="EditPage" component={EditPage} options={{ headerBackTitle: 'Controls' }}/>
        <Stack.Screen name="RowEntry" component={RowEntry} options={{ headerTitle: 'Row {} Entry' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}



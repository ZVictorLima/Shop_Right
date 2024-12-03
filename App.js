import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import AdminScreen from './src/components/AdminScreen';
import AdminControls from './src/components/AdminControls';
import UploadPage from './src/components/UploadPage'; // Import UploadPage
import EditPage from './src/components/EditPage'; // Import EditPage
import ManageUsers from './src/components/manage_users'; // Import ManageUsers
import DepartmentSelectionScreen from './src/components/SelectionScreen'; // Import Departments Screen
import PlanogramsList from './src/components/PlanogramsList';
import StoreListScreen from './src/components/StoreListScreen'; // Import StoreListScreen
import RowEntryScreen from './src/components/RowEntry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitle: 'Login' }}
        />
        {/* Select Store */}
        <Stack.Screen
          name="StoreListScreen"
          component={StoreListScreen}
          options={{ headerTitle: 'Stores' }}
        />


        {/* Admin Screen */}
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{ headerTitle: 'Admin Panel' }}
        />

        {/* Admin Controls Screen */}
        <Stack.Screen
          name="AdminControls"
          component={AdminControls}
          options={{ headerTitle: 'Admin Controls' }}
        />

        {/* Upload Planogram Page */}
        <Stack.Screen
          name="UploadPage"
          component={UploadPage}
          options={{ headerTitle: 'Upload Planogram' }}
        />

        {/* Edit Planogram Page */}
        <Stack.Screen
          name="EditPage"
          component={EditPage}
          options={{ headerTitle: 'Edit Planogram' }}
        />

        {/* Manage Users Page */}
        <Stack.Screen
          name="ManagePage" // Screen name must match the navigation payload
          component={ManageUsers}
          options={{ headerTitle: 'Manage Users' }}
        />

        {/* Department Screen */}
        <Stack.Screen
          name="DepartmentSelectionScreen"
          component={DepartmentSelectionScreen}
          options={{ headerTitle: 'Departments' }}
        />
          
        {/* PlanogramsList Screen */}
        <Stack.Screen
          name="PlanogramsList"
          component={PlanogramsList}
          options={{ headerTitle: 'Select Department' }}
        />

          {/* Row Entry Screen */}
        <Stack.Screen
          name="RowEntry"
          component={RowEntryScreen}
          options={{ headerTitle: 'Row Entry' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AdminControls() {
  const navigation = useNavigation();
  const route = useRoute();
  const { storeId } = route.params; // Get storeId passed from the previous screen

  return (
    <SafeAreaView style={styles.container}>
      {/* Store ID Display */}
      <Text style={styles.storeText}>Selected Store ID: {storeId}</Text>

      <View style={styles.buttonContainer}>
        {/* Upload Planogram Button */}
        <AdminButton
          name="Upload Planogram"
          icon={require('../assets/ForButtons/ButtonsIcons/UploadIcon.png')}
          navigation={navigation}
          page="UploadPage" // Must match the name in Stack.Navigator
          storeId={storeId}
        />

        {/* Edit Existing Planogram Button */}
        <AdminButton
          name="Edit Existing Planogram"
          icon={require('../assets/ForButtons/ButtonsIcons/EditIcon.png')}
          navigation={navigation}
          page="EditPage" // Must match the name in Stack.Navigator
          storeId={storeId}
        />

        {/* Manage Users Button */}
        <AdminButton
          name="Manage Users"
          icon={require('../assets/ForButtons/ButtonsIcons/Dots.png')}
          navigation={navigation}
          page="ManagePage" // Must match the name in Stack.Navigator
          storeId={storeId}
        />
      </View>
    </SafeAreaView>
  );
}

// Admin Button Component
const AdminButton = ({ name, icon, navigation, page, storeId }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(page, { storeId })} // Pass storeId to target page
    >
      <Image source={icon} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  storeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 350,
    height: 100,
    backgroundColor: '#E6E6FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 26,
    fontWeight: '600',
  },
});

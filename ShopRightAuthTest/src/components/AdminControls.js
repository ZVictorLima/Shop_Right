import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AdminControls({ route, navigation }) {
  const { storeData, userId, currentUser } = route.params || {}; // Get the full store data
  const storeId = storeData?.id; // Safely access storeId
  const StoreName = storeData?.StoreName; // Safely access StoreName

  console.log('AdminControls Store Data:', storeData); // Debugging log
  console.log('AdminControls Current User:', currentUser); // Debugging log

  // Add defensive checks for missing data
  if (!storeData || !storeId || !currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Error: Missing required data. Ensure store and user information are passed correctly.
        </Text>
      </SafeAreaView>
    );
  }

  const buttonData = {
    storeData,
    storeId, // Explicitly include storeId
    userId,
    currentUser,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Store Name and ID Display For debugging purposes
      <Text style={styles.storeText}>Store: {StoreName}</Text>
      <Text style={styles.storeText}>Store ID: {storeId}</Text>
      */}
      
      <View style={styles.buttonContainer}>
        <AdminButton
          name="Upload Planogram"
          icon={require('../assets/ForButtons/ButtonsIcons/UploadIcon.png')}
          navigation={navigation}
          page="UploadPage"
          data={buttonData} // Pass consistent data structure
        />
        <AdminButton
          name="Edit Existing Planogram"
          icon={require('../assets/ForButtons/ButtonsIcons/EditIcon.png')}
          navigation={navigation}
          page="EditPage"
          data={buttonData} // Pass consistent data structure
        />
        <AdminButton
          name="Manage Users"
          icon={require('../assets/ForButtons/ButtonsIcons/Dots.png')}
          navigation={navigation}
          page="ManagePage"
          data={buttonData} // Pass consistent data structure
        />
      </View>
    </SafeAreaView>
  );
}

const AdminButton = ({ name, icon, navigation, page, data }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log('Navigating to:', page, 'with data:', data); // Debugging log
        navigation.navigate(page, { ...data }); // Spread the data object for navigation
      }}
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
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
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

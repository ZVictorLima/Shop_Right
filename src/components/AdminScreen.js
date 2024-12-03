import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Get route props to access passed parameters
  const { storeId } = route.params || {}; // Retrieve storeId, defaulting to undefined if not passed

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Please choose one of the following options</Text>

      {/* Store ID Display */}
      {storeId && (
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeInfoText}>Selected Store ID: {storeId}</Text>
        </View>
      )}

      {/* Departments Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('DepartmentSelectionScreen')}
      >
        <Image
          source={require('../assets/ForButtons/ButtonsIcons/BurgerIcon.png')}
          style={styles.icon}
        />
        <Text style={styles.optionText}>Departments</Text>
      </TouchableOpacity>

      {/* Admin Controls Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('AdminControls', { storeId })} // Pass storeId here
      >
        <Image
          source={require('../assets/ForButtons/ButtonsIcons/admIcon.png')}
          style={styles.icon}
        />
        <Text style={styles.optionText}>Admin Controls</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    marginHorizontal: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  storeInfoContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#EDEBFF',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  storeInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    width: '80%',
    height: 100,
    justifyContent: 'flex-start', // Align icon and text to the start
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20, // Space between icon and text
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
});

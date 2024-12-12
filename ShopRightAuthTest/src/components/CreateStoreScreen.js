import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function CreateStoreScreen({ navigation }) {
  const [storeName, setStoreName] = useState('');

  const handleCreateStore = async () => {
    if (!storeName) {
      Alert.alert('Error', 'Please enter a store name.');
      return;
    }

    try {
      const user = "user123"; // Replace with the logged-in user's UID
      await firestore().collection('stores').add({
        StoreName: storeName,
        createdBy: user,
        managers: [],
        workers: [],
      });
      Alert.alert('Success', 'Store created successfully!');
      navigation.goBack(); // Navigate back to the store list
    } catch (error) {
      console.error('Error creating store:', error);
      Alert.alert('Error', 'Failed to create store.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Store</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Store Name"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateStore}>
        <Text style={styles.buttonText}>Create Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

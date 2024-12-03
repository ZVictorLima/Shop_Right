import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function StoreListScreen({ navigation }) {
  const [stores, setStores] = useState([]); // Store the list of stores
  const [relatedStores, setRelatedStores] = useState([]); // Store user's related stores
  const [userId, setUserId] = useState(null); // Store the current user's ID

  // Fetch user ID and related stores on mount
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);

      // Fetch user's related stores from the `related_stores` map
      const fetchUserStores = async () => {
        try {
          const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
          const relatedStoresData = userDoc.data()?.related_stores || {}; // Fetch the map
          console.log('Related Stores:', relatedStoresData); // Debugging log

          // Convert map to an array for easier matching
          const relatedStoresArray = Object.keys(relatedStoresData).map((storeId) => ({
            storeId,
            role: relatedStoresData[storeId]?.role,
          }));
          setRelatedStores(relatedStoresArray);
        } catch (error) {
          console.error('Error fetching related stores:', error);
          Alert.alert('Error', 'Unable to fetch your store access.');
        }
      };

      fetchUserStores();
    } else {
      Alert.alert('Error', 'No user is logged in.');
      navigation.navigate('Login'); // Redirect to Login screen if no user is logged in
    }
  }, [navigation]);

  // Fetch all stores for displaying
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeCollection = await firestore().collection('stores').get();
        const storeList = storeCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Stores:', storeList); // Debugging log
        setStores(storeList);
      } catch (error) {
        console.error('Error fetching stores:', error);
        Alert.alert('Error', 'Unable to fetch stores.');
      }
    };

    fetchStores();
  }, []);

  // Handle store selection
  const handleStoreSelect = (store) => {
    console.log('Selected Store:', store); // Debugging log
    const matchingStore = relatedStores.find((s) => s.storeId === store.id);

    if (matchingStore) {
      const { role } = matchingStore;
      if (role === 'Manager') {
        navigation.navigate('AdminScreen', { storeId: store.id });
      } else if (role === 'Worker') {
        navigation.navigate('SelectionScreen', { storeId: store.id });
      } else {
        Alert.alert('Access Denied', 'You do not have access to this store.');
      }
    } else {
      Alert.alert('Access Denied', 'No access found for this store.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Store</Text>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.storeButton} onPress={() => handleStoreSelect(item)}>
            <Text style={styles.storeName}>{item.StoreName}</Text>
          </TouchableOpacity>
        )}
      />
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
  storeButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  storeName: {
    fontSize: 18,
  },
});

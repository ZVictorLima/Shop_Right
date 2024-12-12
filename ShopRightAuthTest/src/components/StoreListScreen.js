import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function StoreListScreen({ navigation }) {
  const [stores, setStores] = useState([]); // Store the list of stores
  const [relatedStores, setRelatedStores] = useState([]); // Store user's related stores
  const [userId, setUserId] = useState(null); // Store the current user's ID
  const [currentUser, setCurrentUser] = useState(null); // Store the current user's data
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for creating a store
  const [newStoreName, setNewStoreName] = useState(''); // New store name input

  // Fetch user ID and related stores on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentAuthUser = auth().currentUser;
      if (currentAuthUser) {
        setUserId(currentAuthUser.uid);

        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentAuthUser.uid)
            .get();
          const userData = userDoc.data();
          setCurrentUser({ id: currentAuthUser.uid, ...userData });

          const relatedStoresData = userData?.related_stores || {};
          const relatedStoresArray = Object.keys(relatedStoresData).map((storeId) => ({
            storeId,
            role: relatedStoresData[storeId]?.role,
          }));
          setRelatedStores(relatedStoresArray);
        } catch (error) {
          console.error('Error fetching user details:', error);
          Alert.alert('Error', 'Unable to fetch your user data.');
        }
      } else {
        Alert.alert('Error', 'No user is logged in.');
        navigation.navigate('Login'); // Redirect to Login screen if no user is logged in
      }
    };

    fetchUserDetails();
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
    const matchingStore = relatedStores.find((s) => s.storeId === store.id);

    if (matchingStore) {
      const { role } = matchingStore;
      if (role === 'Manager') {
        navigation.navigate('AdminScreen', { storeData: store, currentUser, userId }); // Pass store data, current user, and userId
      } else if (role === 'Worker') {
        navigation.navigate('SelectionScreen', { storeData: store, currentUser, userId }); // Pass store data, current user, and userId
      } else {
        Alert.alert('Access Denied', 'You do not have access to this store.');
      }
    } else {
      Alert.alert('Access Denied', 'No access found for this store.');
    }
  };

  // Handle creating a new store
  const handleCreateStore = async () => {
    if (!newStoreName.trim()) {
      Alert.alert('Error', 'Store name cannot be empty.');
      return;
    }

    try {
      const newStoreRef = await firestore().collection('stores').add({
        StoreName: newStoreName.trim(),
        createdBy: userId,
        Departments: {
          Dairy: {},
          Meat: {},
          Produce: {},
          General: {},
        },
      });

      const newStoreId = newStoreRef.id;

      // Update user's related_stores
      await firestore()
        .collection('users')
        .doc(userId)
        .set(
          {
            related_stores: {
              [newStoreId]: { role: 'Manager' },
            },
          },
          { merge: true }
        );

      Alert.alert('Success', `Store "${newStoreName}" created successfully!`);
      setModalVisible(false);
      setNewStoreName('');

      // Fetch updated stores
      const storeCollection = await firestore().collection('stores').get();
      const storeList = storeCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStores(storeList);

      // Fetch updated user data
      const userDoc = await firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();
      const updatedRelatedStores = Object.keys(userData.related_stores || {}).map((storeId) => ({
        storeId,
        role: userData.related_stores[storeId]?.role,
      }));
      setRelatedStores(updatedRelatedStores);
    } catch (error) {
      console.error('Error creating store:', error);
      Alert.alert('Error', 'Failed to create store.');
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
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for creating a new store */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Store</Text>
          <TextInput
            placeholder="Enter store name"
            value={newStoreName}
            onChangeText={setNewStoreName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleCreateStore}>
            <Text style={styles.modalButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  createButton: {
    backgroundColor: "#000000",
    width: 60,
    height: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
});

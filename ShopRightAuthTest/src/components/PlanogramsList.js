import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const PlanogramsList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { department, storeData } = route.params; // Get department name
  const [planograms, setPlanograms] = useState([]); // State to hold planograms
  const storeId = storeData?.id; // Safely access storeId


  console.log(department);
  // Fetch planograms from Firestore
  useEffect(() => {
    const fetchPlanograms = async () => {
      try {
        const storeDoc = await firestore()
          .collection('stores')
          .doc(storeId) // Replace with dynamic store ID if needed
          .get();

        if (storeDoc.exists) {
          const departments = storeDoc.data().Departments || {};
          const departmentPlanograms = departments[department] || {}; // Get the planograms for the department
          setPlanograms(Object.entries(departmentPlanograms)); // Convert planograms to an array
        } else {
          Alert.alert('Error', 'No data found for this store.');
        }
      } catch (error) {
        console.error('Error fetching planograms:', error);
        Alert.alert('Error', 'Failed to fetch planograms.');
      }
    };

    fetchPlanograms();
  }, [department]);

const handlePlanogramClick = async (planogramName, planogramData) => {

  console.log("Name: " + planogramName);
  console.log("DatA:" + planogramData);
  const fileName = `planogram-${planogramName}-${department}.png`;
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/auth-ec1d5.firebasestorage.app/o/${fileName}?alt=media`;
  console.log(imageUrl)
  navigation.navigate('PlanogramViewer', { imageUrl });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Welcome to the ${department} Department`}</Text>
      <FlatList
        data={planograms}
        keyExtractor={(item) => item[0]} // Use planogram name as key
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.planogramButton}
            onPress={() => handlePlanogramClick(item[0], item[1])} // Pass planogram name and data
          >
            <Text style={styles.planogramText}>{item[0]}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planogramButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  planogramText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PlanogramsList;

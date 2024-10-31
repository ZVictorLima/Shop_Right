
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function AdminControls() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Text aligned to the top left */}
      <Text style={styles.headerText}>Admin Controls</Text>
      
      {/* Main Options */}
      <View style={styles.buttonContainer}>
        <AdminButton 
          name="Upload Planogram" 
          icon="cloud-upload-outline" // Ionicons icon for uploading
        />
        <AdminButton 
          name="Edit Existing Planogram" 
          icon="create-outline" // Ionicons icon for editing
        />
        <AdminButton 
          name="Manage Users" 
          icon="people-outline" // Ionicons icon for managing users
        />
      </View>
    </SafeAreaView>
  );
}

// Admin Button Component
const AdminButton = ({ name, icon }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name={icon} size={40} color="black" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerText: {
    fontSize: 32, // Increased font size for visibility
    fontWeight: 'bold',
    textAlign: 'left', // Aligns text to the left
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center', // Centers buttons vertically
    alignItems: 'center', // Centers buttons horizontally
  },

  button: {
    width: 350, 
    height: 120, 
    backgroundColor: '#E6E6FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10, // Adds space between buttons
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

  buttonIcon: {
    marginRight: 10,
  },

  buttonText: {
    fontSize: 25, 
    fontWeight: '600',
  },
});

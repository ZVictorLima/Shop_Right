import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderPage({ route }) {
  const { departmentName } = route.params; // Receive the department name from navigation

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the placeholder page for:</Text>
      <Text style={styles.departmentName}>{departmentName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  departmentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

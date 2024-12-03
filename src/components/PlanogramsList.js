import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DepartmentScreen = () => {
  const route = useRoute();
  const { department } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Welcome to the ${department} Department`}</Text>
      {/* Add more content based on the department */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DepartmentScreen;

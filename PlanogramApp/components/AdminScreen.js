import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Please choose one of the following options</Text>

      {/* Departments Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('SelectionScreen')}
      >
        <Ionicons name="menu-outline" size={32} color="black" />
        <Text style={styles.optionText}>Departments</Text>
      </TouchableOpacity>

      {/* Admin Controls Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('AdminControls')}
      >
        <Ionicons name="menu-outline" size={32} color="black" />
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
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    width: '80%',
    height: 100,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black'
  },
});

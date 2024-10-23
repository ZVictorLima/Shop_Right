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
      <Text style={styles.title}>Please Choose One Of The Following Options</Text>

      {/* Departments Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('SelectionScreen')}
      >
        <Ionicons name="menu-outline" size={24} color="#4A4A4A" />
        <Text style={styles.optionText}>Departments</Text>
      </TouchableOpacity>

      {/* Admin Controls Button */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('AdminControls')}
      >
        <Ionicons name="menu-outline" size={24} color="#4A4A4A" />
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    width: '80%',
    justifyContent: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
});

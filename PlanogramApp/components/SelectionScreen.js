import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BurgerMenu from '../components/BurgerMenu'; // Import the BurgerMenu component

export default function SelectionScreen() {
  const navigation = useNavigation();

  // Departments array for the burger menu
  const departments = [
    { name: 'Dairy', icon: 'nutrition-outline' },
    { name: 'Meat', icon: 'restaurant-outline' },
    { name: 'Produce', icon: 'leaf-outline' },
    { name: 'General', icon: 'basket-outline' },
  ];

  // Button data for each department
  const buttonData = [
    { name: 'Dairy', image: require('../assets/ForButtons/ButtonsIcons/Dairy.png') },
    { name: 'Meat', image: require('../assets/ForButtons/ButtonsIcons/Meat.png') },
    { name: 'Produce', image: require('../assets/ForButtons/ButtonsIcons/Produce.png') },
    { name: 'General', image: require('../assets/ForButtons/ButtonsIcons/General.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Burger Menu */}
      <BurgerMenu departments={departments} />

      {/* Main Button Content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.rowContainer}>
          {buttonData.map((item, index) => (
            <ButtonComponent key={index} data={item} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Button component to display each department
const ButtonComponent = ({ data, navigation }) => (
  <TouchableOpacity style={styles.selectionButton} onPress={() => navigation.navigate('DepartmentScreen')}>
    <Image source={data.image} style={styles.buttonImage} />
    <Text style={styles.buttonText}>{data.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  selectionButton: {
    width: 160,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scroll: {
    marginTop: 80, // Adds space for the burger menu
  },
});

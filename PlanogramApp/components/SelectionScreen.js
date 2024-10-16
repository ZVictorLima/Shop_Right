import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; 


export default function SelectionScreen() {

  const navigation = useNavigation();

  const dairyData = {
    image: require('../assets/ForButtons/ButtonsIcons/Dairy.png'),
    name: 'Dairy',
  }
  
  const meatData = {
    image: require('../assets/ForButtons/ButtonsIcons/Meat.png'),
    name: 'Meat',
  }
  
  const produceData = {
   image: require('../assets/ForButtons/ButtonsIcons/Produce.png'),
    name: 'Produce',
  }
  const generalData = {
    image: require('../assets/icon.png'),
    name: 'General',
  }




  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={dairyData.image} style={{ height: 120, width: 100 }} />
        <Text style={styles.buttonText}>{dairyData.name}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={meatData.image} style={{ height: 120, width: 100 }} />
        <Text style={styles.buttonText}>{meatData.name}</Text>
      </View>
      </TouchableOpacity>
    </View>

    <View style={styles.imageContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={produceData.image} style={{ height: 120, width: 100 }} />
        <Text style={styles.buttonText}>{produceData.name}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={generalData.image} style={{ height: 100, width: 100 }} />
        <Text style={styles.buttonText}>{generalData.name}</Text>
      </View>
      </TouchableOpacity>
    </View>

    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={dairyData.image} style={{ height: 120, width: 100 }} />
        <Text style={styles.buttonText}>{dairyData.name}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <Image source={meatData.image} style={{ height: 120, width: 100 }} />
        <Text style={styles.buttonText}>{meatData.name}</Text>
      </View>
      </TouchableOpacity>
    </View>

      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  imageContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '33%',
  },

  selectionButton: {
    width: 180,
    height: '100%',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }
})
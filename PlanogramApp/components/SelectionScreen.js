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
    <ScrollView style={styles.scroll}>
    <View style={styles.rowContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={dairyData.image} style={styles.buttonImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{dairyData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={meatData.image} style={styles.buttonImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{meatData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>

    <View style={styles.rowContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={produceData.image} style={styles.buttonImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{produceData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={generalData.image} style={{ height: 100, width: 100 }} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{generalData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>

    <View style={styles.rowContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={dairyData.image} style={styles.buttonImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{dairyData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DepartmentScreen')}>
      <View style={styles.selectionButton}>
        <View style={styles.imageContainer}>
        <Image source={meatData.image} style={styles.buttonImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{meatData.name}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  selectionButton: {
    width: 180,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },

  imageContainer: {
    height: '75%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',

  },

  textContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },

  buttonImage: {
    width: 100,
    height: 120,
  },

  buttonText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  }
})
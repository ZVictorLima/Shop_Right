import { StatusBar } from 'expo-status-bar';
import { Button, Alert, Image, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

const logoImg = require("./assets/logo.png")
const usernameImg = require("./assets/username.png")
const lockImg = require("./assets/lock.png")

export default function App() {
  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.logoContainer}>
      <Image source={logoImg} style={{ height: 300, width: 300, 
        borderWidth: 1, borderColor: 'black', marginTop: 10,
        borderRadius: 0 }} />
    </SafeAreaView>

    <View style={styles.textFieldContainer}>
      <View style={styles.username}>
    <Image source={usernameImg} style={{ height: 60, width: 60 }} />
    <TextInput placeholder="Username" 
    placeholderTextColor="darkgrey"
    style={{borderWidth: 1,
    borderColor: 'black', 
    width: 300,
    fontSize: 50, 
    padding: 10, }}/>
    </View>
    
    <View style={styles.password}>
    <Image source={lockImg} style={{ height: 60, width: 60 }} />
    <TextInput placeholder="Password" 
    secureTextEntry={true}
    placeHolderTextColor="darkgrey"
    style={{borderWidth: 1,
    borderColor: 'black',
    width: 300,
    fontSize: 50,
    padding: 10,
    }}/>
    </View>

    <View style={styles.forgotpasswordContainer} >
      <Text style={{color: 'blue', fontSize: 20}}>
        Forgot Password?
      </Text>
    </View>

    <View style={styles.copyrightContainer}>
      <Text>
        Copyright 2024 © All Rights Reserved
      </Text>
    </View>
    </View>
    </View>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 80
  },

  textFieldContainer: {
    marginTop: 50,
    width: '100%',

  },

  username: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  password: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40
  },

  copyrightContainer: {
    marginTop: 200,
    alignItems: 'center',
  },

  forgotpasswordContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
  
});

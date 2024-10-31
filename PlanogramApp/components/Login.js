import { StatusBar } from 'expo-status-bar'; // not in use
import { 
  Button, 
  Alert, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

// Image imports
const logoImg = require("../assets/Logo/MainLogo.png");
const usernameImg = require("../assets/username.png");
const lockImg = require("../assets/lock.png");

export default function Login() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image 
          source={logoImg} 
          style={{ height: 300, width: 300, marginTop: 10 }} 
        />
      </View>

      {/* Text Fields Container */}
      <View style={styles.textFieldContainer}>
        {/* Username Input */}
        <View style={styles.username}>
          <Image source={usernameImg} style={{ height: 60, width: 60 }} />
          <TextInput 
            placeholder="Username"
            placeholderTextColor="darkgrey"
            style={styles.input}
          />
        </View>

        {/* Password Input */}
        <View style={styles.password}>
          <Image source={lockImg} style={{ height: 60, width: 60 }} />
          <TextInput 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="darkgrey"
            style={styles.input}
          />
        </View>

        {/* Sign On Button */}
        <View style={styles.loginContainer}>
          <TouchableOpacity 
            style={styles.signOnButton}
            onPress={() => navigation.navigate('AdminScreen')}
          >
            <Text style={styles.signOnText}>Sign On</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password Link */}
        <View style={styles.forgotpasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Copyright Info */}
        <View style={styles.copyrightContainer}>
          <Text>
            Copyright 2024 © All Rights Reserved
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 80,
  },
  textFieldContainer: {
    marginTop: 50,
    width: '100%',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    width: '100%',
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
    width: 280,
    fontSize: 18,
    padding: 10,
    marginRight: 25,
  },
  loginContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  signOnButton: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOnText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  forgotpasswordContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'blue',
    fontSize: 20,
  },
  copyrightContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
});

import { 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 

// Image imports
const logoImg = require("../assets/Logo/MainLogo.png");
const usernameImg = require("../assets/username.png");
const lockImg = require("../assets/lock.png");

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    navigation.navigate('AdminScreen');
  }

  const isComplete = username && password;

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image 
          source={logoImg} 
          style={styles.logo} 
        />
      </View>

      {/* Text Fields Container */}
      <View style={styles.textFieldContainer}>
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Image source={usernameImg} style={styles.icon} />
          <TextInput 
            placeholder="Username"
            placeholderTextColor="darkgrey"
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Image source={lockImg} style={styles.icon} />
          <TextInput 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="darkgrey"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {/* Sign On Button */}
        <TouchableOpacity 
          style={styles.signOnButton}
          // disabled={!isComplete}
          onPress={handlePress}
        >
          <Text style={styles.signOnText}>Sign On</Text>
        </TouchableOpacity>

        {/* Copyright Info */}
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            © 2024 Stock Right. All rights reserved.
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
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  textFieldContainer: {
    width: '90%',
    alignItems: 'center',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  signOnButton: {
    backgroundColor: '#E6E6FA',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 15,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  signOnText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyrightContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 14,
    color: '#888',
  },
});


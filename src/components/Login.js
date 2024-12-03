import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const logoImg = require('../assets/Logo/MainLogo.png');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '486176896326-k76oablm42jdtdeoh29f7pri2psqldmb.apps.googleusercontent.com',
    });
  }, []);

  // Fetch user roles from Firestore
  const fetchUserRoles = async (userId) => {
    try {
      const storesSnapshot = await firestore().collection('stores').get();
      const userRoles = [];

      storesSnapshot.forEach((storeDoc) => {
        const rolesCollection = storeDoc.ref.collection('roles');
        rolesCollection
          .doc(userId)
          .get()
          .then((roleDoc) => {
            if (roleDoc.exists) {
              userRoles.push({ storeId: storeDoc.id, role: roleDoc.data().role });
            }
          });
      });

      return userRoles;
    } catch (error) {
      console.error('Error fetching user roles:', error);
      Alert.alert('Error', 'Failed to fetch user roles.');
      return [];
    }
  };
  
  // Updated handleLoginSuccess
const handleLoginSuccess = async (user) => {
  try {
    // Navigate to the Store List Screen after login
    navigation.navigate('StoreListScreen');
  } catch (error) {
    console.error('Error during login navigation:', error);
    Alert.alert('Error', 'Something went wrong.');
  }
};

// For Google Login
const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.idToken || signInResult.data?.idToken;

    if (!idToken) throw new Error('No ID token found');

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const currentUser = await auth().signInWithCredential(googleCredential);

    Alert.alert('Success', `Welcome ${currentUser.user.displayName || currentUser.user.email}!`);
    handleLoginSuccess(currentUser.user); // Navigate to the Store List Screen
  } catch (error) {
    console.error(error);
    Alert.alert('Error', error.message);
  }
};

// For Email/Password Login
const handleEmailLogin = async () => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    Alert.alert('Success', `Logged in as ${userCredential.user.email}`);
    handleLoginSuccess(userCredential.user); // Navigate to the Store List Screen
  } catch (error) {
    console.error(error);
    Alert.alert('Error', error.message);
  }
};

  // Handle Redirection Based on Roles
  const handleRedirect = (roles, user) => {
    if (roles.length === 0) {
      Alert.alert('Error', 'No roles found for this user.');
      return;
    }

    // Navigate based on role
    if (roles.some((role) => role.role === 'Manager')) {
      navigation.navigate('StoreListScreen', { roles, user });
    } else if (roles.some((role) => role.role === 'Worker')) {
      navigation.navigate('WorkerDashboard', { roles, user });
    } else {
      Alert.alert('Access Denied', 'You do not have the required permissions.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logo} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    height: 200,
    width: 200,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

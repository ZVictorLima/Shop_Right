import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Modal,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const logoImg = require("../assets/Logo/MainLogo.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false); // Modal visibility state
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "486176896326-k76oablm42jdtdeoh29f7pri2psqldmb.apps.googleusercontent.com",
    });
  }, []);

  const handleLoginSuccess = async (user) => {
    navigation.navigate("StoreListScreen");
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

  const handleEmailLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      Alert.alert("Success", `Logged in as ${userCredential.user.email}`);
      handleLoginSuccess(userCredential.user);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  const handleSignUp = async () => {
    const { name, email, password, phone } = signUpDetails;

    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      // Add user to Firestore
      const userDocRef = firestore().collection("users").doc(userCredential.user.uid);
      await userDocRef.set({
        email,
        name,
        phone,
        related_stores: {}, // Initialize with no related stores
      });

      Alert.alert("Success", "Account created successfully!");
      setSignUpModalVisible(false); // Close the modal
      setSignUpDetails({ name: "", email: "", password: "", phone: "" }); // Reset the form
      navigation.navigate("StoreListScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
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
        placeholderTextColor="gray" 
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="gray" 
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

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => setSignUpModalVisible(true)} // Open the Sign Up modal
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Modal
        visible={isSignUpModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSignUpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="grey"
              value={signUpDetails.name}
              onChangeText={(text) =>
                setSignUpDetails((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              value={signUpDetails.email}
              onChangeText={(text) =>
                setSignUpDetails((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="grey"
              value={signUpDetails.password}
              onChangeText={(text) =>
                setSignUpDetails((prev) => ({ ...prev, password: text }))
              }
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Phone (Optional)"
              placeholderTextColor="grey"
              value={signUpDetails.phone}
              onChangeText={(text) =>
                setSignUpDetails((prev) => ({ ...prev, phone: text }))
              }
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setSignUpModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },

  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  signUpButton: {
    backgroundColor: "#FFFFFF",
  },
  signUpButtonText: {
    color: "black", // Change the text color to black
  },
  modalButtonContainer: {
    marginTop: 20, // Add space between the buttons and the input fields
    marginLeft: 15,
    width: "110%",
    justifyContent: "space-around",

  },
});


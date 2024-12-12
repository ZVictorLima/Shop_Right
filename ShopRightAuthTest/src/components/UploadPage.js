import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

export default function UploadPage() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [shelfWidth, setShelfWidth] = useState("");
  const [shelfHeight, setShelfHeight] = useState("");
  const [shelvesDisplay, setShelvesDisplay] = useState("");
  const [department, setDepartment] = useState(""); // Default department
  const [name, setName] = useState(""); // Planogram name
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Dropdown toggle

  const navigation = useNavigation();
  const route = useRoute();
  const { storeData } = route.params || {}; // Store data from the previous screen

  // Ensure storeData exists
  if (!storeData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Store data not found.</Text>
      </View>
    );
  }

  const { id: storeId, Departments } = storeData; // Destructure useful properties

  const handlePress = async () => {
    const nameRegex = /^[A-Za-z0-9]+$/; // Matches only letters, no spaces or other characters
    if (!nameRegex.test(name)) {
      Alert.alert(
        "Invalid Name",
        "Planogram name must contain only letters with no spaces."
      );
      return;
    }

    if (isNaN(shelfWidth) || parseFloat(shelfWidth) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid gondola width.");
      return;
    }

    if (isNaN(shelfHeight) || parseFloat(shelfHeight) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid gondola height.");
      return;
    }

    const numRows = parseInt(shelvesDisplay, 10);
    if (!/^\d+$/.test(shelvesDisplay) || numRows <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid whole number for rows.");
      return;
    }

    try {
      // Save the planogram metadata to Firestore
      const planogramPath = `Departments.${department}.${name}`;
      await firestore()
        .collection("stores")
        .doc(storeId)
        .update({
          [planogramPath]: JSON.stringify({
            shelfWidth,
            shelfHeight,
            numRows,
          }),
        });

      // Alert.alert("Success", "Planogram created successfully!"); // for debugging purposes

      // Pass all required data to the next page
      navigation.navigate("RowEntry", {
        numRows,
        currentRow: 1,
        shelfHeight,
        shelfWidth,
        department,
        name,
        allRowsData: [], // Empty initially, rows will be added step by step
        storeId, // Use the dynamic store ID
      });
    } catch (error) {
      console.error("Error saving planogram:", error);
      Alert.alert("Error", "Failed to save the planogram. Please try again.");
    }
  };

  const isFormComplete =
    shelfWidth && shelfHeight && shelvesDisplay && department && name;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.createContainer}>
          <Text style={styles.headerText}>Create Your Planogram</Text>
          <Text style={styles.subHeaderText}>Fields marked * are required</Text>

          {/* Planogram Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Planogram Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter planogram name"
              placeholderTextColor={"#999"}
              value={name}
              onChangeText={setName}
              keyboardType="default"
            />
          </View>

          {/* Department Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Department *</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <Text style={styles.dropdownText}>
                {department || "Select a department"}
              </Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <ScrollView
                style={styles.dropdownList}
                contentContainerStyle={styles.dropdownListContent}
              >
                {Object.keys(Departments).map((dep, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setDepartment(dep);
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{dep}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
          

          {/* Gondola Width */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Gondola Width *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter gondola width"
              placeholderTextColor={"#999"}
              value={shelfWidth}
              onChangeText={setShelfWidth}
              keyboardType="numeric"
            />
          </View>

          {/* Gondola Height */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Gondola Height *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter gondola height"
              placeholderTextColor={"#999"}
              value={shelfHeight}
              onChangeText={setShelfHeight}
              keyboardType="numeric"  // Only allow numbers
            />
          </View>

          {/* Number of Rows */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Number of Rows *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of rows"
              placeholderTextColor={"#999"}
              value={shelvesDisplay}
              onChangeText={setShelvesDisplay}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              !isFormComplete && styles.disabledButton,
            ]}
            onPress={handlePress}
            disabled={!isFormComplete}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  createContainer: {
    marginTop: 25,
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  labelText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#f2f2f2",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    maxHeight: 177, // Limit dropdown height just for the sake of presentation this will need to be taken care of later. the list should be modular
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  dropdownListContent: {
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#E6E6FA",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#dcdcdc",
  },
  saveButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});

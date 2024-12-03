import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firestore from "@react-native-firebase/firestore";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

export default function ManageUsersScreen({ route }) {
  const { storeId } = route.params;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [menuVisible, setMenuVisible] = useState(null);

  // Fetch users related to the store
  useEffect(() => {
    const fetchStoreUsers = async () => {
  try {
    const snapshot = await firestore().collection("users").get();

    const usersData = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        const relatedStore = data.related_stores?.[storeId];
        if (relatedStore) {
          return {
            id: doc.id,
            email: data.email,
            name: data.name,
            phone: data.phone,
            role: relatedStore.role,
          };
        }
        return null;
      })
      .filter((user) => user !== null);

    setUsers(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
    Alert.alert("Error", "Failed to fetch users for this store.");
  }
};


    fetchStoreUsers();
  }, [storeId]);

  // Add a user to the store
  const handleAddUser = async () => {
    if (!newUserEmail) {
      Alert.alert("Error", "Please enter a user email.");
      return;
    }

    try {
      const querySnapshot = await firestore()
        .collection("users")
        .where("email", "==", newUserEmail)
        .get();

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;

        await firestore()
          .collection("users")
          .doc(userId)
          .set(
            {
              related_stores: {
                [storeId]: { role: "Worker" },
              },
            },
            { merge: true }
          );

        Alert.alert("Success", "User added successfully!");
        setAddUserModalVisible(false);
        setNewUserEmail("");
      } else {
        Alert.alert("Error", "No user found with that email.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert("Error", "Failed to add user.");
    }
  };

  // Edit a user's role
  const handleEditUserRole = async () => {
    if (!newRole) {
      Alert.alert("Error", "Please select a role.");
      return;
    }

    try {
      await firestore()
        .collection("users")
        .doc(selectedUser.id)
        .set(
          {
            related_stores: {
              [storeId]: { role: newRole },
            },
          },
          { merge: true }
        );

      Alert.alert("Success", "User role updated successfully!");
      setEditModalVisible(false);
      setSelectedUser(null);
      setNewRole("");
    } catch (error) {
      console.error("Error updating user role:", error);
      Alert.alert("Error", "Failed to update user role.");
    }
  };

  // Remove a user from the store
  const handleRemoveUser = async () => {
    if (!selectedUser) {
      Alert.alert("Error", "No user selected for removal.");
      return;
    }
  
    try {
      await firestore()
        .collection("users")
        .doc(selectedUser.id)
        .update({
          [`related_stores.${storeId}`]: firestore.FieldValue.delete(),
        });
  
      Alert.alert("Success", "User removed successfully!");
      // Remove the user from the state
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setSelectedUser(null); // Clear the selected user
    } catch (error) {
      console.error("Error removing user:", error);
      Alert.alert("Error", "Failed to remove user.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Users</Text>

      {/* Display Users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View>
              <Text style={styles.userName}>{item.name || "Unnamed User"}</Text>
              <Text style={styles.userRole}>{item.role}</Text>
            </View>
            <Menu
              visible={menuVisible === item.id}
              anchor={
                <TouchableOpacity onPress={() => setMenuVisible(item.id)}>
                  <Text style={styles.menuDots}>⋮</Text>
                </TouchableOpacity>
              }
              onRequestClose={() => setMenuVisible(null)}
            >
              <MenuItem
                onPress={() => {
                  setSelectedUser(item);
                  setEditModalVisible(true);
                  setMenuVisible(null);
                }}
              >
                Edit
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  setSelectedUser(item);
                  handleRemoveUser();
                  setMenuVisible(null);
                }}
              >
                Remove
              </MenuItem>
            </Menu>
          </View>
        )}
      />

      {/* Add User Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAddUserModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add User Modal */}
      <Modal visible={addUserModalVisible} transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add User</Text>
          <TextInput
            placeholder="User Email"
            value={newUserEmail}
            onChangeText={setNewUserEmail}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setAddUserModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Edit Role Modal */}
      <Modal visible={editModalVisible} transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Edit User Role</Text>
          <Text>Name: {selectedUser?.name || "N/A"}</Text>
          <Text>Phone: {selectedUser?.phone || "N/A"}</Text>
          <Picker
            selectedValue={newRole || selectedUser?.role}
            onValueChange={(itemValue) => setNewRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Worker" value="Worker" />
            <Picker.Item label="Manager" value="Manager" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleEditUserRole}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setEditModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  menuDots: {
    fontSize: 24,
    color: "#888",
  },
  addButton: {
    backgroundColor: "#007BFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
});


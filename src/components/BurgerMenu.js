import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';

export default function BurgerMenu({ departments }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300)); // Initial slide position off-screen
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to toggle the burger menu overlay
  const toggleMenu = () => {
    if (isMenuVisible) {
      // Slide out when closing
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(() => setIsMenuVisible(false));
    } else {
      // Slide in when opening
      setIsMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
  };

  // Filter departments based on the search query
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Overlay Clickable Area */}
      {isMenuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlayBackground} />
        </TouchableWithoutFeedback>
      )}

      {/* Burger Icon */}
      <TouchableOpacity style={styles.burgerIconContainer} onPress={toggleMenu}>
        <Image
          source={require('../assets/ForButtons/ButtonsIcons/BurgerIcon.png')}
          style={styles.burgerIcon}
        />
      </TouchableOpacity>

      {/* Slide Overlay for Departments */}
      {isMenuVisible && (
        <Animated.View style={[styles.overlayMenu, { left: slideAnim }]}>
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search departments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Filtered Departments */}
          {filteredDepartments.map((department, index) => (
            <View key={index} style={styles.departmentContainer}>
              <Image source={department.icon} style={styles.departmentIcon} />
              <Text style={styles.overlayText}>{department.name}</Text>
            </View>
          ))}

          {/* No Results Found */}
          {filteredDepartments.length === 0 && (
            <Text style={styles.noResultsText}>No departments found</Text>
          )}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  burgerIconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    zIndex: 2,
    elevation: 5,
  },
  burgerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  overlayMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 3,
    elevation: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  departmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  departmentIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  overlayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

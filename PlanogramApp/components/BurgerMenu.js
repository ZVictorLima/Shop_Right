import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BurgerMenu({ departments }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0]; // Initial slide position off-screen

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
        <Ionicons name="menu-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Slide Overlay for Departments */}
      {isMenuVisible && (
        <Animated.View style={[styles.overlayMenu, { left: slideAnim }]}>
          {departments.map((department, index) => (
            <View key={index} style={styles.departmentContainer}>
              <Ionicons name={department.icon} size={20} color="black" />
              <Text style={styles.overlayText}>{department.name}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  burgerIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 2,
    elevation: 5,
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
  },
  departmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  overlayText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

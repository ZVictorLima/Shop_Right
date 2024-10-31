/* 
    Description:
              - This page will take a image (For QR) or a shelf number (For manual entry) and display the products on that shelf.
    Features: 
              - Access user's camera to scan QR code
              - Manual entry of shelf number
              - Communicates properly with the database to display the products on the shelf 
    Output:   
              - Display the products on the shelf
*/
/*
    For this test we will be using  React-Native-Vision-Camera to access the camera and scan the QR code
    VisionCamera requires iOS 12 or higher, and Android-SDK version 21 or higher.
*/ 
import React, { Component } from 'react'
import { Text, View , StyleSheet, TextInput} from 'react-native'


const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (

      // Text Input Example
      <View>
        <Text>Enter some text</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
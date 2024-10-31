import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import React, { Component, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadPage() {
    const [inputText, setInputText] = useState('')

    const handleSave = () => {
        console.log('Saved text:', inputText)
      }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerText}>
        <Text>Please enter the following information to build your planogram</Text>
        </View>
        <View>
            <Text>Department: </Text>
            <TextInput placeholder="Department Name" value={inputText} onChangeText={text => setInputText(text)} />
            <Button title="Save" onPress={handleSave} />
            
        </View>
        <View>
            <Text>Shelf Number: </Text>
            <TextInput placeholder="Shelf Number" />
        </View>
        <View>
            <Text>Total Shelf Width: </Text>
            <TextInput placeholder="Shelf width" />
        </View>
        <View>  
            <Text>Total Shelf Height: </Text>
            <TextInput placeholder="Shelf height" />
        </View>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
    flex: 1,
},

headerText: {
    borderWidth: 2,
    borderColor: 'black',
    
}
});
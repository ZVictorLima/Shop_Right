import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import React, { Component, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function UploadPage() {
    const [gondolaWidth, setGondolaWidth] = useState('');
    const [gondolaHeight, setGondolaHeight] = useState('');
    const [rowHeight, setRowHeight] = useState('');
    const [shelvesDisplay, setShelvesDisplay] = useState('');

    const navigation = useNavigation();

    const handlePress = () => {
        console.log('Gondola width: ', gondolaWidth);
        console.log('Gondola height: ', gondolaHeight);
        console.log('Height of each row: ', rowHeight);
        console.log('Shelves on display: ', shelvesDisplay);
        navigation.navigate('RowEntry');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View>
        <Text style={styles.headerText}>Create Your Planogram</Text>
        </View>

        <View>
            <Text style={styles.bodyText}>Width of Gondola: </Text>
            <TextInput 
            style={styles.bodyText}
            placeholder="Shelf width" 
            value={gondolaWidth}
            onChangeText={setGondolaWidth}/>
        </View>
        <View>  
            <Text style={styles.bodyText}>Height of Gondola: </Text>
            <TextInput 
            style={styles.bodyText}
            placeholder="Shelf height" 
            value={gondolaHeight}
            onChangeText={setGondolaHeight}/>
        </View>
        <View>  
            <Text>Individual Row Height: </Text>
            <TextInput placeholder="Individual row height" 
            value={rowHeight}
            onChangeText={setRowHeight}/>
        </View>
        <View>  
            <Text>Number of shelves on display: </Text>
            <TextInput placeholder="shelves on display" 
            value={shelvesDisplay}
            onChangeText={setShelvesDisplay}
            />
        <Button title="Save" onPress={handlePress} />
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
    fontSize: 30,
},

bodyText: {
    fontSize: 20,
}

});
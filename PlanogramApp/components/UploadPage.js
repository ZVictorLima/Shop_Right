import { Text, View, StyleSheet, TextInput, Button, PressableOpacity } from 'react-native'
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

            <View style={styles.createContainer}>

                <View>
                    <Text style={styles.headerText}>Create Your Planogram</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.bodyText}>Gondola width: </Text>
                    <TextInput
                        style={styles.bodyText}
                        placeholder="inches"
                        value={gondolaWidth}
                        onChangeText={setGondolaWidth} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.bodyText}>Gondola height: </Text>
                    <TextInput
                        style={styles.bodyText}
                        placeholder="inches"
                        value={gondolaHeight}
                        onChangeText={setGondolaHeight} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.bodyText}>Space between rows: </Text>
                    <TextInput
                        style={styles.bodyText}
                        placeholder='inches'
                        value={rowHeight}
                        onChangeText={setRowHeight} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.bodyText}>Number of rows: </Text>
                    <TextInput
                        style={styles.bodyText}
                        placeholder='rows'
                        value={shelvesDisplay}
                        onChangeText={setShelvesDisplay}
                    />
                </View>
                <Button title="Save" 
                color={'blue'}
                style={styles.saveButton}
                onPress={handlePress} 
                 />

            </View>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        
    },

    createContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },

    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        },

    bodyText: {
        fontSize: 24,
    },

    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    saveButton: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 24,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },

});
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function UploadPage() {

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const [gondolaWidth, setGondolaWidth] = useState('');
    const [gondolaHeight, setGondolaHeight] = useState('');
    //const [rowHeight, setRowHeight] = useState('');
    const [shelvesDisplay, setShelvesDisplay] = useState('');
    const [department, setDepartment] = useState('');

    const navigation = useNavigation();

    const handlePress = () => {

        if (isNaN(gondolaWidth) || parseFloat(gondolaWidth) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid gondola width.');
            return;
        }

        if (isNaN(gondolaHeight) || parseFloat(gondolaHeight) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid gondola height.');
            return;
        }

        

        const numRows = parseInt(shelvesDisplay, 10);
        if (isNaN(numRows) || numRows <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid number of rows.');
            return;
        }

        // this parameters shoud be sent to store in firestore databaser - V 
        navigation.navigate('RowEntry', { 
            numRows, 
            currentRow: 1, 
            gondolaHeight, 
            gondolaWidth, 
            //rowHeight, 
            allRowsData: [] });
    };

    const isFormComplete = gondolaWidth && gondolaHeight && shelvesDisplay; // && rowHeight;

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.createContainer}>
                    <Text style={styles.headerText}>Create Your Planogram</Text>
                    <Text style={styles.subHeaderText}>Fields marked * are required</Text>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Department *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="department"
                            placeholderTextColor={'#999'}
                            value={department}
                            onChangeText={setDepartment}
                            keyboardType="default"
                        />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Gondola width *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="inches"
                            placeholderTextColor={'#999'}
                            value={gondolaWidth}
                            onChangeText={setGondolaWidth}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Gondola height *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="inches"
                            placeholderTextColor={'#999'}
                            value={gondolaHeight}
                            onChangeText={setGondolaHeight}
                            keyboardType="numeric"
                        />
                    </View>

                    

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Number of rows *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="rows"
                            placeholderTextColor={'#999'}
                            value={shelvesDisplay}
                            onChangeText={setShelvesDisplay}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, !isFormComplete && styles.disabledButton]}
                        onPress={handlePress}
                        disabled={!isFormComplete}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },

    createContainer: {
        marginTop: 25,
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },

    subHeaderText: {
        fontSize: 16,
    },

    inputContainer: {
        marginVertical: 10,
    },

    labelText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },

    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f2f2f2',
    },

    saveButton: {
        backgroundColor: '#E6E6FA',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },

    disabledButton: {
        backgroundColor: '#dcdcdc', // Lighter gray to indicate disabled state
    },

    saveButtonText: {
        color: '#333', // Darker color for contrast on light lavender button
        fontSize: 18,
        fontWeight: '600',
    },
});
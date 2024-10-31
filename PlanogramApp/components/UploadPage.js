import { Text, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadPage() {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerText}>
        <Text>Upload Page</Text>
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
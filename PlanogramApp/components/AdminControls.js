import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import axios from 'axios'; // For making API requests

export default function AdminControls() {
  const [fileName, setFileName] = useState(null);

  // Function to handle file selection
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileName(res[0].name);
      readFile(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('File selection canceled');
      } else {
        Alert.alert('Unknown error: ' + err.message);
      }
    }
  };

  // Function to read Excel file
  const readFile = async (uri) => {
    try {
      const fileData = await RNFS.readFile(uri, 'base64');
      const binary = Buffer.from(fileData, 'base64');
      const workbook = XLSX.read(binary, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      uploadToServer(data);
    } catch (error) {
      Alert.alert('Error reading file: ' + error.message);
    }
  };

  // Function to upload data to server
  const uploadToServer = async (data) => {
    try {
      const response = await axios.post('https://your-server-url/api/upload', { data });
      if (response.status === 200) {
        Alert.alert('File uploaded successfully!');
      } else {
        Alert.alert('Failed to upload file');
      }
    } catch (error) {
      Alert.alert('Server error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Controls</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
        <Text style={styles.buttonText}>Upload Planogram</Text>
      </TouchableOpacity>

      {fileName && <Text style={styles.fileName}>Selected File: {fileName}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  uploadButton: {
    backgroundColor: '#dcdcdc',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  fileName: {
    fontSize: 16,
    marginTop: 10,
  },
});

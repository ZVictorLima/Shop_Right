import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RowEntryScreen() {
  const [numProducts, setNumProducts] = useState('');
  const [productDimensions, setProductDimensions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { rowCount, currentRow } = route.params;

  const handleNumProductsChange = (value) => {
    const parsedValue = parseInt(value, 10);
    setNumProducts(value);
    if (value === '') {
      return;
    }

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setProductDimensions((prevDimensions) => {
        const updatedDimensions = [...prevDimensions];
        if (parsedValue > updatedDimensions.length) {

          for (let i = updatedDimensions.length; i < parsedValue; i++) {
            updatedDimensions.push({ width: '', height: '', upc: '', numberFacing: '' });
          }
        } else if (parsedValue < updatedDimensions.length) {

          return updatedDimensions.slice(0, parsedValue);
        }
        return updatedDimensions;
      });
    } else {
      // Reset if input is invalid or zero
      setProductDimensions([]);
    }
  };

  const handleDimensionChange = (index, type, value) => {
    setProductDimensions((prevDimensions) => {
      const updatedDimensions = [...prevDimensions];
      updatedDimensions[index] = { ...updatedDimensions[index], [type]: value };
      return updatedDimensions;
    });
  };

  const handleNext = () => {

    console.log(productDimensions);
    const parsedNumProducts = parseInt(numProducts, 10);
    if (isNaN(parsedNumProducts) || parsedNumProducts < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of products to stock.');
      return;
    }


    const allValidDimensions = productDimensions.every(dim => {
      const widthValid = !isNaN(dim.width) && parseFloat(dim.width) > 0;
      const heightValid = !isNaN(dim.height) && parseFloat(dim.height) > 0;
      return widthValid && heightValid;
    });

    if (!allValidDimensions) {
      Alert.alert('Invalid Dimensions', 'Please ensure all product widths and heights are valid positive numbers.');
      return;
    }

    const allValidNumberFacings = productDimensions.every(dim => {
      const numberFacingValid = !isNaN(dim.numberFacing) && parseInt(dim.numberFacing, 10) > 0;
      return numberFacingValid;
    });

    if (!allValidNumberFacings) {
      Alert.alert('Invalid Number Facing', 'Please ensure each product facing number is a positive integer.');
      return;
    }

    const allValidUPCs = productDimensions.every(dim => /^\d{12}$/.test(dim.upc));

    if (!allValidUPCs) {
      Alert.alert('Invalid UPC', 'Please ensure each product UPC is a 12-digit number.');
      return;
    }

    if (currentRow < rowCount) {
      navigation.push('RowEntry', {
        rowCount,
        currentRow: currentRow + 1,
        allRowsData: [...(route.params.allRowsData || []), productDimensions],
        gondolaHeight: route.params.gondolaHeight,
        gondolaWidth: route.params.gondolaWidth,
        rowHeight: route.params.rowHeight
      });
    } else {
      navigation.navigate('PlanogramSuccess', {
        allRowsData: [...(route.params.allRowsData || []), productDimensions],
        gondolaHeight: route.params.gondolaHeight,
        gondolaWidth: route.params.gondolaWidth,
        rowHeight: route.params.rowHeight
      });
    }
  };

  const renderProductInputs = () => {
    const parsedNumProducts = parseInt(numProducts, 10);
    const inputs = [];

    if (!isNaN(parsedNumProducts) && parsedNumProducts > 0) {
      for (let i = 0; i < parsedNumProducts; i++) {
        inputs.push(
          <View key={i} style={styles.productDimensionsContainer}>
            <Text style={styles.labelText}>Product {i + 1} Information</Text>

            <Text>Width * </Text>
            <TextInput
              style={styles.input}
              placeholder="Width"
              keyboardType="numeric"
              value={productDimensions[i]?.width}
              onChangeText={(value) => handleDimensionChange(i, 'width', value)}
            />

            <Text>Height * </Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              keyboardType="numeric"
              value={productDimensions[i]?.height}
              onChangeText={(value) => handleDimensionChange(i, 'height', value)}
            />

            <Text>Number of facings *</Text>
            <TextInput
              style={styles.input}
              placeholder="Number facing"
              keyboardType="numeric"
              value={productDimensions[i]?.numberFacing}
              onChangeText={(value) => handleDimensionChange(i, 'numberFacing', value)}
            />

            <Text>UPC *</Text>
            <TextInput
              style={styles.input}
              placeholder="UPC"
              keyboardType="numeric"
              value={productDimensions[i]?.upc}
              onChangeText={(value) => handleDimensionChange(i, 'upc', value)}
            />
          </View>
        );
      }
    }
    return inputs;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Row {currentRow} Entry</Text>

        <Text style={styles.labelText}>Number of products to stock on row {currentRow}</Text>
        <TextInput
          style={styles.input}
          value={numProducts}
          onChangeText={handleNumProductsChange}
          placeholder="Number of products to stock"
          keyboardType="numeric"
        />

        {renderProductInputs()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleNext}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>
            {currentRow < rowCount ? 'Next Row' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  labelText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
    alignSelf: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
  productDimensionsContainer: {
    marginVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 4,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
  },

  nextButton: {
    backgroundColor: '#E6E6FA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  nextButtonText: {
    color: '#333', // Darker color for contrast on light lavender button
    fontSize: 18,
    fontWeight: '600',
  },
});

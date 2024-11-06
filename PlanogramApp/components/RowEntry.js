// test commit

import { StyleSheet, SafeAreaView, TextInput, Text, View, Image } from 'react-native';
import React, { useState } from 'react';

export default function RowEntry() {
  const [numProducts, setNumProducts] = useState(1);
  const [productData, setProductData] = useState([]);  // Store product data from API

  const handleApiCall = async (upc, index) => {
    try {
      const response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`);
      const data = await response.json();
      if (data && data.items && data.items.length > 0) {
        const item = data.items[0];
        
        setProductData((prevData) => {
          const newData = [...prevData];
          newData[index] = item;
          return newData;
        });
      } else {
        console.log(`No data found for UPC: ${upc}`);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const renderProductInputs = () => {
    return Array.from({ length: numProducts }).map((_, index) => (
      <View key={index} style={styles.productContainer}>
        <Text>{`Product ${index + 1} UPC`}</Text>
        <TextInput
          placeholder="UPC"
          style={styles.input}
          onChangeText={(upc) => handleApiCall(upc, index)}  // Trigger API call when UPC is entered
        />

        {productData[index] && (
          <View style={styles.productInfo}>
            <Text>Title: {productData[index].title}</Text>
            <Text>Brand: {productData[index].brand}</Text>
            <Text>Category: {productData[index].category}</Text>

            {productData[index].images && productData[index].images[0] ? (
              <Image
                source={{ uri: productData[index].images[0] }}  // Display the product image
                style={styles.productImage}
                resizeMode="contain"
              />
            ) : (
              <Text>No image available</Text>
            )}
          </View>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerText}>
        <Text>Please enter the following information for row (number)</Text>
      </View>

      <View>
        <Text>Number of unique product(s)</Text>
        <TextInput
          placeholder="Enter number of unique products"
          style={styles.input}
          keyboardType="numeric"
          value={numProducts.toString()}
          onChangeText={(value) => setNumProducts(Number(value))}
        />
      </View>

      <View>{renderProductInputs()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
    flex: 1,
  },
  productContainer: {
    marginVertical: 10,
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  productInfo: {
    marginTop: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 100,  // Set appropriate width for the image
    height: 100, // Set appropriate height for the image
    marginTop: 10,
  },
  headerText: {
    margin: 20,
    fontSize: 18,
  },
});

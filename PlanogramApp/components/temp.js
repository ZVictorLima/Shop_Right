import { StyleSheet, SafeAreaView, TextInput, Text, View, Image, Button } from 'react-native';
import React, { useState } from 'react';

export default function RowEntry() {
  const [numProducts, setNumProducts] = useState(1);
  const [productData, setProductData] = useState([]);  // Store product data from API
  const [upcList, setUpcList] = useState(['']);  // Store UPCs for each product

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

  const handleUpcChange = (upc, index) => {
    const newUpcList = [...upcList];
    newUpcList[index] = upc;
    setUpcList(newUpcList);
  };

  const renderProductInputs = () => {
    return Array.from({ length: numProducts }).map((_, index) => (
      <View key={index} style={styles.productContainer}>
        <Text>{`Product ${index + 1} UPC`}</Text>
        <TextInput
          placeholder="UPC"
          style={styles.input}
          value={upcList[index] || ''}
          onChangeText={(upc) => handleUpcChange(upc, index)}  // Update UPC state for the respective index
        />
        <Button
          title="Submit"
          onPress={() => handleApiCall(upcList[index], index)}  // Trigger API call when button is pressed
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
          onChangeText={(value) => {
            const num = Number(value);
            setNumProducts(num);
            setUpcList(Array(num).fill(''));  // Adjust UPC list length when number of products changes
            setProductData(Array(num).fill(null));  // Adjust product data length when number of products changes
          }}
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



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// export default function RowEntryScreen() {
//   const [numProducts, setNumProducts] = useState(0);
//   const [productDimensions, setProductDimensions] = useState([]);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { rowCount, currentRow } = route.params;

//   // Update product dimensions for a specific product
//   const handleDimensionChange = (index, type, value) => {
//     const newProductDimensions = [...productDimensions];
//     if (!newProductDimensions[index]) {
//       newProductDimensions[index] = { width: '', height: '' };
//     }
//     newProductDimensions[index][type] = value;
//     setProductDimensions(newProductDimensions);
//   };

//   const handleNext = () => {
//     if (numProducts <= 0 || productDimensions.some(dim => !dim.width || !dim.height)) {
//       Alert.alert('Incomplete Entry', 'Please enter valid dimensions for all products.');
//       return;
//     }

//     if (currentRow < rowCount) {
//       navigation.push('RowEntry', { rowCount, currentRow: currentRow + 1 });
//     } else {
//       navigation.navigate('PlanogramSuccess');
//     }
//   };

//   // Create product dimension inputs dynamically based on numProducts
//   const renderProductInputs = () => {
//     const inputs = [];
//     for (let i = 0; i < numProducts; i++) {
//       inputs.push(
//         <View key={i} style={styles.productDimensionsContainer}>
//           <Text style={styles.labelText}>Product {i + 1} Dimensions</Text>

//           <Text>Width: </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Width"
//             keyboardType="numeric"
//             value={productDimensions[i]?.width}
//             onChangeText={(value) => handleDimensionChange(i, 'width', value)}
//           />

//           <Text>Height: </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Height"
//             keyboardType="numeric"
//             value={productDimensions[i]?.height}
//             onChangeText={(value) => handleDimensionChange(i, 'height', value)}
//           />
//         </View>
//       );
//     }
//     return inputs;
//   };

//   // Safely handle the numProducts input
//   const handleNumProductsChange = (value) => {
//     // Parse the value and default to 0 if it's not a valid number
//     const parsedValue = parseInt(value, 10);
//     if (isNaN(parsedValue)) {
//       setNumProducts(0); // Reset to 0 if input is invalid
//     } else {
//       setNumProducts(parsedValue);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Row {currentRow} Entry</Text>

//       <Text style={styles.labelText}>Number of products</Text>
//       <TextInput
//         style={styles.input}
//         value={String(numProducts)}
//         onChangeText={handleNumProductsChange}
//         placeholder="Number of products to stock"
//         keyboardType="numeric"
//       />

//       {renderProductInputs()}

//       <Button
//         title={currentRow < rowCount ? 'Next Row' : 'Finish'}
//         onPress={handleNext}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   labelText: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 5,
//   },
//   input: {
//     height: 45,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     backgroundColor: '#f2f2f2',
//   },
//   productDimensionsContainer: {
//     marginVertical: 10,
//   },
// });

import { StyleSheet, SafeAreaView, TextInput, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'

export default function RowEntry() {

  const [numProducts, setNumProducts] = useState(1);

  const renderProductInputs = () => {
    return Array.from({ length: numProducts }).map((_, index) => (
      <View key={index} style={styles.productContainer}>
        <Text>{`Dimensions of product ${index + 1}`}</Text>
        <TextInput placeholder={`Enter dimensions for product ${index + 1}`} style={styles.input} />

        <Text>{`Number facing for product ${index + 1}`}</Text>
        <TextInput placeholder={`Enter number facing for product ${index + 1}`} style={styles.input} />
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

  }
});
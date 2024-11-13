import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PlanogramSuccess({ route }) {
    const navigation = useNavigation();
    const { allRowsData, gondolaHeight, gondolaWidth, rowHeight } = route.params;
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        let delay = 0; // Initial delay for spacing out requests

        allRowsData.forEach((rowData, rowIndex) => {
            rowData.forEach((product, productIndex) => {
                setTimeout(() => {
                    fetchProductData(product.upc, rowIndex, productIndex);
                }, delay);
                delay += 500; // Increment delay by 500ms for each product
            });
        });
    }, [allRowsData]);

    const fetchProductData = async (upc, rowIndex, productIndex) => {
        try {
            const response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`);
            const data = await response.json();
            if (data && data.items && data.items.length > 0) {
                const item = data.items[0];

                // Update productData with the fetched item details
                setProductData((prevData) => {
                    const newData = [...prevData];
                    if (!newData[rowIndex]) newData[rowIndex] = [];
                    newData[rowIndex][productIndex] = item;
                    return newData;
                });
            } else {
                console.log(`No data found for UPC: ${upc}`);
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    if (!allRowsData || allRowsData.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>No data available to display.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Planogram Successfully Created!</Text>
                <Button title="Go Back Home" onPress={() => navigation.pop()} />

                {/* Gondola Information */}
                <View style={styles.infoContainer}>
                    <Text>Gondola Height: {gondolaHeight}</Text>
                    <Text>Gondola Width: {gondolaWidth}</Text>
                    <Text>Row Height: {rowHeight}</Text>
                </View>

                {/* Display rows and products */}
                {productData.map((rowData, rowIndex) => (
                    <View key={rowIndex} style={styles.rowContainer}>
                        <Text style={styles.rowHeader}>Row {rowIndex + 1}</Text>
                        {rowData.map((product, productIndex) => (
                            <View key={productIndex} style={styles.productContainer}>
                                <Text>Product {productIndex + 1}</Text>
                                <Text>Width: {allRowsData[rowIndex][productIndex].width}</Text>
                                <Text>Height: {allRowsData[rowIndex][productIndex].height}</Text>
                                <Text>Number Facing: {allRowsData[rowIndex][productIndex].numberFacing}</Text>
                                <Text>UPC: {allRowsData[rowIndex][productIndex].upc}</Text>
                                
                                {/* Display product image if available */}
                                {product && product.images && product.images.length > 0 ? (
                                    <Image source={{ uri: product.images[0] }} style={styles.productImage} />
                                ) : (
                                    <Text>No Image Available</Text>
                                )}
                                <Text>Title: {product ? product.title : 'Loading...'}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 20,
    },
    rowContainer: {
        marginBottom: 20,
    },
    rowHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

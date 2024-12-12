import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { ViroARScene, ViroARSceneNavigator, ViroImage, ViroAmbientLight, ViroButton } from '@reactvision/react-viro';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PlanogramSuccess() {
    const [imageUrl, setImageUrl] = useState(null);

    const navigation = useNavigation();

    const route = useRoute();
    const data = route.params;
    console.log(data);
    console.log(JSON.stringify(data.allRowsData, null, 2));
    console.log(JSON.stringify(data, null, 2));

    async function getURL(data) {
        try {
            const response = await fetch('https://createplanogram-test-2-xjiidjknxq-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Response received', responseData);
            
            setImageUrl(responseData.imageUrl);
            console.log('Image URL:', imageUrl);
        } catch (error) {
            console.error('Error generating planogram:', error);
        }
    }

    useEffect(() => {
        if (data) {
            getURL(data);
        }
    }, [data]);


    const ARScene = () => {
        const [imagePosition, setImagePosition] = useState([0, 0, -1]);
      
        // Handlers for updating the image position
        const moveLeft = () => setImagePosition(([x, y, z]) => [x - .1, y, z]);
        const moveRight = () => setImagePosition(([x, y, z]) => [x + .1, y, z]);
        const moveUp = () => setImagePosition(([x, y, z]) => [x, y + .1, z]);
        const moveDown = () => setImagePosition(([x, y, z]) => [x, y -.1, z]);
        const moveIn = () => setImagePosition(([x, y, z]) => [x, y , z -1]);
        const moveOut = () => setImagePosition(([x, y, z]) => [x, y , z + 1]);
      return(
        <ViroARScene>
            <ViroImage
                source={{ uri: imageUrl }}
                position={imagePosition}
                scale={[1, 1, 1]}
            />
            <ViroButton
            position={[-2, 0, -3]} // Position the button to the left of the image
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/leftButton.png")} // Replace with a left button image
            onClick={moveLeft}
          />
    
          {/* Move Right */}
          <ViroButton
            position={[2, 0, -3]} // Position the button to the right of the image
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/rightButton.png")} // Replace with a left button image
            onClick={moveRight}
          />
    
          {/* Move Down*/}
          <ViroButton
            position={[0, -2, -3]} // Position the button below the image
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/downButton.png")} // Replace with a left button image
            onClick={moveDown}
          />
          {/* Move Down*/}
          <ViroButton
            position={[0, 2, -3]} // Position the button below the image
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/upButton.png")} // Replace with a left button image
            onClick={moveUp}
          />
          
           {/*oveIn*/}
           <ViroButton
            position={[-1, -1, -3]} 
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/MinusButton.png")} // Replace with a left button image
            onClick={moveIn}
          />
          {/*MoveOut*/}
          <ViroButton
            position={[1, -1, -3]} // Position the button to the left of the image
            width={0.5}
            height={0.5}
            source={require("../assets/ForButtons/ButtonsIcons/plusIcon.png")} // Victor add a left button
            onClick={moveOut}
          />
        
            </ViroARScene>
      )
    };
    

    const handleGoBack = () => {
        navigation.navigate('AdminScreen');
    };

    return (
        <>
            <Button
                onPress={handleGoBack}
                title="Go Back"
                color="black"
            />
            {imageUrl ?
                <ViroARSceneNavigator initialScene={{ scene: ARScene }} style={styles.arView} />
                :
                <Text style={styles.loadingText}>Generating Image...</Text>
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    arView: {
        flex: 1,
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray',
    },
    image: {
        width: '100%',
        height: 300,
        margin: 20,
        alignSelf: 'center',
    }
});
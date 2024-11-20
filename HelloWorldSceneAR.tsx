import React, { useEffect } from "react";
import { 
  ViroARScene, 
  ViroQuad, 
  ViroImage,
  Viro3DObject,
  ViroAmbientLight
} from "@reactvision/react-viro";

const ARPlaneScene = () => {
  // Define positions and dimensions explicitly as tuples
  const planePosition: [number, number, number] = [0, -1, -3]; // Fixed position for the plane
  const planeDimensions: [number, number] = [3, 3]; // Width and height of the plane

  // Adjusted positions for images in a 3x2 grid
  const image1Position: [number, number, number] = [-0.75, 0.5, -3];
  const image2Position: [number, number, number] = [0, 0.5, -3];
  const image3Position: [number, number, number] = [0.75, 0.5, -3];
  const image4Position: [number, number, number] = [-0.75, -0.5, -3];
  const image5Position: [number, number, number] = [0, -0.5, -3];
  const image6Position: [number, number, number] = [0.75, -0.5, -3];

  useEffect(() => {
    console.log("Plane created at position:", planePosition);
  }, []);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" intensity={0.8} />

      {/* Transparent quad plane */}
      <ViroQuad
        position={planePosition} 
        rotation={[0, 0, 0]} 
        width={planeDimensions[0]} 
        height={planeDimensions[1]} 
        materials={[]} 
        opacity={0} 
      />
      
      {/* Add images tethered to the quad */}
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image1Position}
        scale={[0.5, 0.5, 1]} 
      />
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image2Position}
        scale={[0.5, 0.5, 1]} 
      />
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image3Position}
        scale={[0.5, 0.5, 1]} 
      />
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image4Position}
        scale={[0.5, 0.5, 1]} 
      />
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image5Position}
        scale={[0.5, 0.5, 1]} 
      />
      <ViroImage
        source={require("./Mock_Planogram.png")}
        position={image6Position}
        scale={[0.5, 0.5, 1]} 
      />

      {/* Add 3D object */}
      <Viro3DObject
        source={require("./models/lipstick.obj")} // Replace with the actual path to your 3D model
        position={image6Position} // Same position as Image 6
        scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
        type="OBJ" // Specify the file type
      />
    </ViroARScene>
  );
};

export default ARPlaneScene;

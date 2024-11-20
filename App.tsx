import React from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import ARPlaneScene from "./HelloWorldSceneAR"; // Correct path to ARPlaneScene

const App = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{ scene: ARPlaneScene }} // Set ARPlaneScene as the initial scene
    />
  );
};

export default App;

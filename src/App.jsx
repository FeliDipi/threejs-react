import { Canvas } from "@react-three/fiber"
import Car from "./components/Car"
import Road from "./components/Road"

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={2}/>
      <Road position={[0,-10,-50]} scale={[1,1,10]}/>
      <Car position={[0,-10,-15]} rotation={[0,-90 * (Math.PI/180),0]}/>
    </Canvas>
  )
}

export default App

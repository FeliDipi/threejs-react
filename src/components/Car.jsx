import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three-stdlib';

const Car = (props) => {
  const ref = useRef();
  const model = useLoader(FBXLoader,"./src/assets/models/car.fbx");

  const [position, setPosition] = useState(0); // 0: center, -1: left, 1: right

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft' && position > -1) {
        setPosition(position - 1);
      } else if (event.key === 'ArrowRight' && position < 1) {
        setPosition(position + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position]);

  useFrame(() => {
    ref.current.position.x = position * 6; // Move the car between -2, 0, and 2 on the x-axis
  });

  return <primitive ref={ref} object={model} {...props} />
}

export default Car;
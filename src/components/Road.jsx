import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";

export const Road = (props) =>
{
    const ref = useRef();
    const model = useLoader(FBXLoader,"./src/assets/models/road.fbx");

    const clonedModel = model.clone();

    return <primitive ref={ref} object={clonedModel} {...props}/>;
}

export default Road;
import {Canvas, useFrame, useThree, extend} from "react-three-fiber"
import {useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

extend({OrbitControls})

export default function RotatingCubeByReactThreeFiber() {

    const Orbit = () => {
        const {camera, gl} = useThree()
        return (
            <orbitControls args={[camera, gl.domElement]}/>
        )
    }

    const Box = (props) => {
        const ref = useRef()
        useFrame(state => {
            console.log(state)
            ref.current.rotation.x += 0.01
            ref.current.rotation.y += 0.01
        })
        return (
            <mesh ref={ref} {...props}>
                <boxBufferGeometry/>
                <meshBasicMaterial color="blue"/>
            </mesh>
        )
    }

    return (
        <Canvas camera={{position: [3, 3, 3]}} style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
            <Box position={[1,1,0]}/>
            <Orbit/>
            <axesHelper args={[5]}/>
            {/*竖直（绿色）的是y轴，左边（蓝色）的是z轴，右边（橙色）的是x轴*/}
        </Canvas>
    )
}
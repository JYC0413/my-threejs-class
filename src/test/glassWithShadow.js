import {Canvas, useThree, extend, useFrame} from "react-three-fiber"
import {useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

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
            <mesh castShadow ref={ref} {...props}>
                <boxBufferGeometry/>
                <meshPhysicalMaterial
                    // opacity={0.2}//透明度（若降为0则该物体消失）
                    transmission={0.7}//透明度（若降为1则该物体不可见但仍存在，而且灯光能照出来）
                    transparent//是否透明，需要配合opacity使用
                    // metalness={1}//决定物体是否自发光
                    roughness={0}//决定物体的粗糙度（漫反射/镜面反射）
                    clearcoat={1}//类似给物体表面增加一层反光壳
                    reflectivity={1}//反射率
                    side={THREE.DoubleSide}
                    color="white"
                />
            </mesh>
        )
    }

    const Floor = (props) => {
        return (
            <mesh {...props} castShadow receiveShadow>
                <boxBufferGeometry args={[12, 1, 12]}/>
                <meshPhysicalMaterial metalness={1}/>
            </mesh>
        )
    }

    const Bulb = (props) => {
        return (
            <mesh {...props}>
                <pointLight castShadow/>
                <sphereBufferGeometry args={[0.2, 20, 20]}/>
                <meshPhongMaterial emissive="yellow"/>
            </mesh>
        )
    }


    return (
        <Canvas shadows camera={{position: [3, 3, 3]}}
                style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
            <fog attach='fog' args={["black", 1, 10]}/>
            <ambientLight intensity={0.2}/>
            <Bulb position={[0, 3, 0]}/>
            <Orbit/>
            <axesHelper args={[5]}/>
            <Box position={[0, 1, 0]}/>
            <Floor position={[0, -0.5, 0]}/>
        </Canvas>
    )
}
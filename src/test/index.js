import {Canvas, useThree, extend, useLoader, useFrame} from "react-three-fiber"
import {useRef, Suspense, useEffect} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

extend({OrbitControls})

export default function RotatingCubeByReactThreeFiber() {


    const Orbit = () => {
        const {camera, gl} = useThree()
        return (
            <orbitControls args={[camera, gl.domElement]}/>
        )
    }

    function Rig() {
        return useFrame((state) => {
            state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 3 + state.mouse.x / 2, 0.075)
            state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 10 + state.mouse.y / 2, 0.075)
            state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.z, 15 + state.mouse.y / 2, 0.075)
        })
    }

    const handlePinterDown = (e) => {
        console.log(e)
        e.object.active = !e.object.active
        window.activeMesh = e.object
    }

    const onPointerEnter = (e) => {
        e.object.scale.x = 1.2
        e.object.scale.y = 1.2
        e.object.scale.z = 1.2
    }

    const onPointerLeave = (e) => {
        if (!e.object.active) {
            e.object.scale.x = 1
            e.object.scale.y = 1
            e.object.scale.z = 1
        }
    }

    const Box = (props) => {
        const ref = useRef()
        const texture = useLoader(THREE.TextureLoader, "/pic.jpg")
        useFrame(state => {
            ref.current.rotation.x += 0.01
            ref.current.rotation.y += 0.01
        })
        return (
            <mesh
                castShadow
                onPointerDown={handlePinterDown}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                ref={ref}
                {...props}>
                <boxBufferGeometry/>
                <meshPhysicalMaterial map={texture}/>
            </mesh>
        )
    }

    const Duck = (props) => {
        const duck = useLoader(GLTFLoader, "/psyduck_kfc_toy/scene.gltf")
        const mixer = new THREE.AnimationMixer(duck.scene)
        console.log(duck)
        const action = mixer.clipAction(duck.animations[0])
        action.play()
        useFrame((state, delta, frame) => {
            mixer?.update(delta);
        })
        return (
            <primitive object={duck.scene} scale={new Array(3).fill(0.1)}/>
        )
    }

    const Background = (props) => {
        const texture = useLoader(THREE.TextureLoader, "/61bc.jpg")
        const {gl} = useThree()
        console.log(texture.image.height)
        const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture)
        return (
            <primitive attach="background" object={texture}/>
        )
    }

    const Floor = (props) => {
        const texture = useLoader(THREE.TextureLoader, "/2big.png")
        return (
            <mesh {...props} castShadow receiveShadow>
                <cylinderGeometry args={[2.75, 3, 0.25, 20]}/>
                <meshPhysicalMaterial map={texture}/>
            </mesh>
        )
    }

    const Bulb = (props) => {
        return (
            <mesh {...props}>
                <pointLight castShadow/>
                <sphereBufferGeometry args={[0.5, 20, 20]}/>
                <meshPhongMaterial emissive="yellow"/>
            </mesh>
        )
    }


    return (
        <Canvas shadows camera={{position: [3, 6, 5]}}
                style={{height: "100vh", width: "100vw", backgroundColor: "black"}}>
            <fog attach='fog' args={["black", 1, 50]}/>

            <ambientLight intensity={0.3}/>
            <Bulb position={[-3, 6, 3]}/>
            <Orbit/>
            {/*<axesHelper args={[5]}/>*/}
            <Suspense fallback={null}>
                <Box position={[4, 1, 0]}/>
            </Suspense>
            <Suspense fallback={null}>
                <Duck/>
            </Suspense>
            <Suspense fallback={null}>
                <Box position={[-4, 1, 0]}/>
            </Suspense>
            <Suspense fallback={null}>
                <Background/>
            </Suspense>
            <Floor position={[0, -0.2, 0]}/>
            {/*<audio src="/public/music.wav"/>*/}
        </Canvas>
    )
}
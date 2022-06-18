import * as THREE from "three"
//导入threejs并为引入的内容命名方便引用
import {useEffect} from "react";


export default function RotatingCubeByThree() {

    let scene
    let camera
    let renderer
    let cube

    const initScene = () => {
        scene = new THREE.Scene()//创建场景
        //PerspectiveCamera构造器的四个参数按顺序是：
        // fovfov — 摄像机视锥体垂直视野角度
        // aspect — 摄像机视锥体长宽比
        // near — 摄像机视锥体近端面
        // far — 摄像机视锥体远端面
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)//创建透视相机
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)//可以通过降低长宽减少渲染分辨率和视窗大小，若第三个参数（updateStyle）传入false则以当前设置的分辨率全屏显示
        document.body.innerHTML = ''
        document.body.appendChild(renderer.domElement)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 'blue'});
        cube = new THREE.Mesh(geometry, material);
        camera.position.z = 5;
        scene.add(cube);
    }

    const animate = () => {

        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        console.log(cube.rotation.x)
        console.log(cube.rotation.x)

        renderer.render(scene, camera);
    }

    //页面改变大小时场景及相机会跟着同步改变
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    initScene()

    useEffect(() => {
        animate()
    }, [])

    return (
        <div/>
    )
}
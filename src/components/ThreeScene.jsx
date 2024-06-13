// src/ThreeScene.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const [loadedModel,setLoadedModel] = useState(null);

    useEffect(() => {
        const currentMount = mountRef.current;

        // Escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);

        // Cámara
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Luz
        const light = new THREE.DirectionalLight(0xffffff);
        light.intensity = 2.5;
        light.position.set(0, 1, 0).normalize();
        scene.add(light);

        // Controles orbitales
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        // Model
        const loader = new FBXLoader();
        loader.load('./src/assets/models/Car_1_1.fbx', (object) => {
          object.scale.set(0.25, 0.25, 0.25); // Ajusta la escala si es necesario
          setLoadedModel(object);
          scene.add(object);
        });

        const animate = () => {
            requestAnimationFrame(animate);

            if(loadedModel)
            {
                loadedModel.rotation.x += 0.01;
                loadedModel.rotation.y += 0.01;   
            }

            controls.update();

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div className='scene' ref={mountRef} />;
};

export default ThreeScene;

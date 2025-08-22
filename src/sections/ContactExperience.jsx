import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Monke } from '../components/Models/Monke'; // Ensure this path is correct

const ContactExperience = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100%', height: '100%' }}>
            {/* Lights for the scene */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <pointLight position={[-3, 2, -2]} intensity={0.7} /> {/* Added another point light */}

            {/* The Monke 3D Model */}
            <Monke />

            {/* OrbitControls for interactivity and auto-rotation */}
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={5}
                maxPolarAngle={Math.PI / 2} // Restrict vertical rotation downwards
                minPolarAngle={Math.PI / 3} // Restrict vertical rotation upwards
            />
        </Canvas>
    );
};

export default ContactExperience;


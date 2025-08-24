import React, {useState, useCallback} from 'react';
import { Canvas } from '@react-three/fiber';
import { AsciiRenderer, OrbitControls } from '@react-three/drei';
import { Monke } from '../components/Models/Monke';
import { Plane } from '../components/Models/Paper_plane.jsx'; // Assuming you have PaperPlane.jsx
import { Knot } from '../components/Models/Knot';         // Assuming you have Knot.jsx
import { Donut } from '../components/Models/Donut';         // Assuming you have Donut.jsx
import * as THREE from 'three'; // Import THREE for any material adjustments

// Define a list of your models
const models = [
  { component: Monke, scale: 2.2, rotation:[0, 0, 0]},
  { component: Plane, scale: 10.4, rotation:[Math.PI*0.9, 0, 0]}, // Adjust scale as needed for PaperPlane
  { component: Knot, scale: 1, rotation:[0, 0, 0]},  // Adjust scale as needed for Knot
  { component: Donut, scale: 2.5, rotation:[Math.PI/1.8, 0, 0]},     // Adjust scale as needed for Donut
];

const ContactExperience = () => {
    // State to keep track of the current model being displayed
    const [currentModelIndex, setCurrentModelIndex] = useState(0);

    // Callback to cycle to the next model on click
    const handleClick = useCallback(() => {
        setCurrentModelIndex(prevIndex => (prevIndex + 1) % models.length);
        useState
    }, []);

    
    // Get the current model's component and scale
    const CurrentModelComponent = models[currentModelIndex].component;
    const currentModelScale = models[currentModelIndex].scale;
    const currentModelRotation = models[currentModelIndex].rotation;
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100%', height: '100%' }}
        // gl={{ antialias: false, alpha: false }}

        >
            {/* Lights for the scene */}
            <ambientLight intensity={0.1} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <pointLight position={[-4, 2, -2]} intensity={0.7} /> {/* Added another point light */}


            <AsciiRenderer
                renderIndex={1} // Helps ensure AsciiRenderer is rendered on top if multiple effects
                characters={' .:-+*=%@#'} // Characters to use for the ASCII rendering
                fgColor='white' // Foreground color of the ASCII characters
                bgColor='bl' // Background color behind the ASCII characters

                resolution={0.2} // Lower resolution = larger "pixels" (more chunky ASCII)
                invert={false} // Inverts the character set brightness (like the example)
            // Adjust gamma and color to match your desired aesthetic
            // enableZoom={false} // AsciiRenderer will handle camera, but OrbitControls also has zoom.
            />
            {/* The Monke 3D Model */}
                    {/* Dynamically render the current 3D Model with its specific scale */}
                    <CurrentModelComponent scale={currentModelScale} 
                                    onClick={handleClick}
                        rotation={currentModelRotation}
                />

            {/* OrbitControls for interactivity and auto-rotation */}
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={5}
            />
        </Canvas>
    );
};

export default ContactExperience;


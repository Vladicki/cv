
// components/SVGMesh.jsx

import React from 'react'
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import * as THREE from 'three'

const SVGMesh = ({ path, color = '#ffffff', scale = 0.01, position = [0, 0, 0] }) => {
    const { paths } = useLoader(SVGLoader, path)

    const shapes = React.useMemo(() => {
        return paths.flatMap(p => p.toShapes(true))
    }, [paths])

    return (
        <group scale={[scale, scale, scale]} position={position}>
            {shapes.map((shape, index) => (
                <mesh key={index}>
                    <shapeGeometry args={[shape]} />
                    <meshBasicMaterial color={color} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    )
}

export default SVGMesh

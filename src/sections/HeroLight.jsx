
const HeroLights = () => {

    // Basic LIGHT params
    // position = { []}
    // intensity = {}
    // color = '#F0F0F0'
    // rotation = { [x / Math.PI / 4, y / Math.PI / 4, z / Math.PI / 4]}

    // penumbra={0.2}/>  SHARPNESS of light

    //TYPES OF LIGHT
    {/*  <pointLight*/ }
    {/* <directionalLight /> */ }
    {/* <ambientLight /> */ }

    {/* <primitive  + OBJECT */ }
    {/*     object={new THREE.RectAreaLight('A259FF')}             /> */ }

    return (
        <>
            {/* <ambientLight intensity={0.2} color="#1a1a40" /> */}
            <directionalLight intensity={5} position={[-0.5, 4.5, 5]} />
            <ambientLight intensity={2} />

        </>
    )
}


export default HeroLights

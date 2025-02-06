import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';

const Skyboxgen = () => {
    const [texture, setTexture] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(0); // To store the aspect ratio for debugging

    useEffect(() => {
        // Load texture directly from public folder
        const loader = new THREE.TextureLoader();
        const image = new Image();

        image.onload = () => {
            const imgAspectRatio = image.width / image.height;
            setAspectRatio(imgAspectRatio); // Store the aspect ratio for debugging

            // Log aspect ratio for debugging
            console.log('Aspect Ratio of Image:', imgAspectRatio);

            // Load the texture
            loader.load(image.src, (loadedTexture) => {
                loadedTexture.encoding = THREE.sRGBEncoding;
                loadedTexture.minFilter = THREE.LinearFilter;
                loadedTexture.magFilter = THREE.LinearFilter;

                // Optional: Ensure texture wraps around smoothly
                loadedTexture.wrapS = THREE.RepeatWrapping;
                loadedTexture.wrapT = THREE.RepeatWrapping;

                // Adjust the texture's repeat based on the aspect ratio
                loadedTexture.repeat.set(imgAspectRatio, 1);

                setTexture(loadedTexture);
            });
        };

        image.src = '/p2.webp'; // Path to your skybox image
        // image.src = '/p4.jpg'; // Path to your skybox image
        // image.src = '/p1.jpg'; // Path to your skybox image

        return () => {
            if (texture) {
                texture.dispose();
            }
        };
    }, [texture]);

    return (
        <>
            <Canvas camera={{ position: [0, 0, 0.1] }} style={{ height: '90vh' }}>
                <OrbitControls enableZoom={false} enableDamping autoRotate={false} rotateSpeed={-0.5} />
                <Suspense fallback={null}>
                    <Preload all />
                    <group>
                        <mesh>
                            {/* Hemisphere using sphereGeometry */}
                            <sphereGeometry args={[500, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
                            {texture && (
                                <meshBasicMaterial
                                    map={texture}
                                    side={THREE.BackSide}
                                    wrapS={THREE.RepeatWrapping}
                                    wrapT={THREE.RepeatWrapping}
                                />
                            )}
                        </mesh>
                    </group>
                </Suspense>
            </Canvas>
            {/* Debugging Text Display */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '20px' }}>
                <p>Aspect Ratio: {aspectRatio}</p>
                <p>Texture Repeat: {`[${aspectRatio}, 1]`}</p>
            </div>
        </>
    );
};

export default Skyboxgen;

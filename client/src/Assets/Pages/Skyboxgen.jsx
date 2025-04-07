import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useState } from "react";
import Theme, { GlobleVariable } from "../../Theme";
import { Button } from "@mui/material";
import axios from "axios";
import { getuser } from "../Component/Navbar";

const Skyboxgen = () => {
    const Backend_url = GlobleVariable.Backend_url;
    const [texture, setTexture] = useState(null);
    const [inputText, setinputText] = useState("");
    const [aspectRatio, setAspectRatio] = useState(1);
    const [imageSrc, setImageSrc] = useState("/p2.webp");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const userdata = getuser();

    useEffect(() => {
        if (!imageSrc) return;

        const loader = new THREE.TextureLoader();
        const textureLoader = new Image();

        textureLoader.onload = () => {
            const imgAspectRatio = textureLoader.width / textureLoader.height;
            setAspectRatio(imgAspectRatio);

            const base64Texture = new THREE.Texture(textureLoader);
            base64Texture.needsUpdate = true;
            base64Texture.encoding = THREE.sRGBEncoding;
            base64Texture.minFilter = THREE.LinearFilter;
            base64Texture.magFilter = THREE.LinearFilter;
            base64Texture.wrapS = THREE.RepeatWrapping;
            base64Texture.wrapT = THREE.RepeatWrapping;
            base64Texture.repeat.set(imgAspectRatio, 1);

            setTexture(base64Texture);
        };

        textureLoader.src = imageSrc.startsWith("data:image")
            ? imageSrc
            : `/p2.webp`; // Default texture

        return () => texture?.dispose(); // Dispose texture on unmount
    }, [imageSrc]);


    const inputChange = (e) => {
        setinputText(e.target.value);
    }

    const handleSubmit = async (e) => {

        const apiKey = GlobleVariable.getCurrentApiKey();
        console.log(apiKey)
        e.preventDefault();

        setLoading(true);
        setError(""); // Reset the error message

        try {
            // Check user credits before proceeding
            const checkcredit = await axios.post(`${Backend_url}/checkcredit`, userdata);
            if (checkcredit.data.mtype === "warning") {
                setError("Insufficient Credits");
                setLoading(false);
                return;
            } else if (checkcredit.data.mtype === "fail") {
                setError("Please Login First");
                setLoading(false);
                return;
            }

            const userPrompt = inputText.trim() || "a beautiful fantasy landscape"; // Fallback if empty
            const staticPrompt = `A highly detailed seamless 360-degree  skybox of ${userPrompt}. The scene is immersive, ultra-realistic, and designed for a panoramic environment. Rendered in 8K resolution, perfect for VR and gaming.`;

            const formData = new FormData();
            formData.append('prompt', staticPrompt);
            formData.append('output_format', 'webp');

            // Call the API to generate the image
            const response = await axios.post(
                `https://api.stability.ai/v2beta/stable-image/generate/core`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Handle API response
            if (response.status === 200) {
                const image = response.data.image;
                const imageDataObject = {
                    userdata: {
                        user: {
                            _id: userdata.user._id,
                        },
                    },
                    image: `data:image/webp;base64,${image}`,
                };
                // await axios.post(`${Backend_url}/saveimagedata`, { imageDataObject });
                const base64Image = response.data.image;

                // Set the new image source
                setImageSrc(`data:image/webp;base64,${base64Image}`);
            } else {
                setError("Error generating image. Please try again.");
            }
        } catch (error) {
            // Handle error from the API call
            console.error('Error generating image:', error);
            GlobleVariable.switchApiKey(); // Switch API key on error
            // setError("Error generating image, trying another API key.");
            await handleSubmit(e);

        } finally {
            setLoading(false);

        }

    }

    return (
        <div style={{ flex: 1, position: "relative" }}>
            {loading
                ? <div style={{ height: "90vh", backgroundColor: "black", animation: "blink 1s infinite alternate", }} >
                    <style>
                        {`
                    @keyframes blink {
                        0% { background-color: #202020; }
                        100% { background-color: #404040; }
                    }
                `}
                    </style>
                </div>
                :
                <Canvas camera={{ position: [0, 0, 0.1] }} style={{ height: "90vh" }}>
                    <OrbitControls enableZoom={false} enableDamping autoRotate={false} rotateSpeed={-0.5} />
                    <Suspense fallback={null}>
                        <Preload all />
                        <mesh>
                            <sphereGeometry args={[500, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
                            {texture && <meshBasicMaterial map={texture} side={THREE.BackSide} />}
                        </mesh>
                    </Suspense>
                </Canvas>
            }



            {/* Form Section */}
            <div style={{ position: "absolute", bottom: 0, width: "100%", textAlign: "center", padding: "10px" }}>
                <form onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <textarea
                        placeholder="Enter Your Prompt"
                        value={inputText}
                        onChange={inputChange}
                        rows={2}
                        disabled={loading}
                        style={{
                            width: "50vw",
                            height: "60px",
                            backgroundColor: `rgba(0, 0, 0, 0.5)`,
                            color: Theme.white[100],
                            border: "2px solid grey",
                            padding: "8px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            resize: "none",
                            outline: "none",
                            overflow: "hidden",
                            opacity: loading ? 0.5 : 1,
                            cursor: loading ? "not-allowed" : "text",
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "10%",
                            height: "10%",
                            backgroundColor: "#007bff",
                            fontSize: "clamp(0.9rem, 2vw, 1rem)",
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: "#0056b3",
                            },
                        }}
                    >Submit</Button>
                </form>
            </div>
        </div >
    );
};

export default Skyboxgen;

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Rive from '@rive-app/react-canvas';

const Image_Output_section = ({ loading, imageUrl, handleDownload }) => {
    const [animation, setAnimation] = useState("Walking");
    const [isTransitioning, setIsTransitioning] = useState(false); 

    useEffect(() => {
        const animationCycle = async () => {
            if (isTransitioning) return; // Prevent overlapping transitions

            setIsTransitioning(true);
            let nextAnimation = animation;

            // Set the transition speed based on the current animation
            let transitionSpeed = 5000; // Default slow speed

            switch (animation) {
                case "Walking":
                    nextAnimation = "Walking2Working";
                    transitionSpeed = 2000; // Faster transition for Walking to Working
                    break;
                case "Walking2Working":
                    nextAnimation = "Working";
                    transitionSpeed = 600; // Slower speed for Working
                    break;
                case "Working":
                    nextAnimation = "Working2Walking";
                    transitionSpeed = 2000; // Faster transition for Working to Walking
                    break;
                case "Working2Walking":
                    nextAnimation = "Walking";
                    transitionSpeed = 600; // Slower speed for Walking
                    break;
                default:
                    break;
            }

            // Transition to the next animation after the specified duration
            setTimeout(() => {
                setAnimation(nextAnimation); // Update animation
                setIsTransitioning(false); // Allow the next transition
            }, transitionSpeed);
        };

        animationCycle(); // Start the animation cycle

        // Clean up the interval if necessary (though `setTimeout` handles this already)
        return () => clearTimeout(animationCycle);
    }, [animation, isTransitioning]);

    return (
        <>
            {loading ? (
                <Box width="500px" height="450px"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"gray", borderRadius: "10px" }}
                >
                    <Rive 
                        src="/Rive_Folder/the_walking___working_dead.riv"
                        animations={animation} // Dynamically set the animation
                        sx={{backgroundColor:"red", width:"100%", height:"100%"}}
                    />
                </Box>
            ) : imageUrl ? (
                <div>
                    <img
                        src={`data:image/webp;base64,${imageUrl}`}
                        alt="Generated"
                        style={{ width: "500px", height: "500px", borderRadius: "8px" }}
                    />
                    <br />
                    <button onClick={handleDownload} style={{ marginTop: "10px", background: "blue" }}>
                        Download Image
                    </button>
                </div>
            ) : (
                <Typography variant="body2" color="textSecondary" sx={{ color: "white" }}>
                    Your image will appear here.
                </Typography>
            )}
        </>
    );
};

export default Image_Output_section;

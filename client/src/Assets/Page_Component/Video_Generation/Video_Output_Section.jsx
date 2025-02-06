import React, { useState } from 'react';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import Theme from "../../../Theme"
import Rive from '@rive-app/react-canvas';

const Video_Output_Section = ({ loading, videoUrl }) => {
    return (
        <>
            {loading ? (
                <Box width="600px" height="450px"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: "99", backgroundColor: "black" }}>
                    {/* <Skeleton variant="rectangular" width="500px" height="500px"
                                style={{ backgroundColor: '#778899', borderRadius: "10px" }}
                                animation="wave"
                            /> */}
                    <Rive src="/Rive_Folder/ballin.riv"
                        stateMachines="Baller"
                        sx={{ backgroundColor: "red", width: "100%", height: "100%" }}
                    />
                </Box>
            ) : videoUrl ? (
                <div>
                    <video
                        src={videoUrl}
                        controls
                        style={{ width: "500px", height: "100%", objectFit: "Cover" }}
                    />
                    <br />
                    <Button
                        sx={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: Theme.secondary[100],
                            color: Theme.white[100],
                            fontWeight: 'bold',
                            "&:hover": { backgroundColor: Theme.primary[10] },
                        }}
                        onClick={() => {
                            const a = document.createElement('a');
                            a.href = videoUrl;
                            a.download = 'video.mp4';
                            a.click();
                        }}
                    >
                        Download Video
                    </Button>
                </div>
            ) : (
                <Typography variant="body2" color="textSecondary" sx={{ color: "white", }}>
                    Your image will appear here.
                </Typography>
            )}
        </>
    )
}

export default Video_Output_Section;
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Button, Typography, Slider, Box } from '@mui/material';
import { useState } from 'react';
import Theme from "../../../Theme";

const Video_Input_Section = ({ handleChange, handleSubmit, sliderValues, sliderLimit, onSliderChange, errorMessage, fileName, loading }) => {
    return (
        <Box sx={{ textAlign: 'center', marginTop: '0px', padding: '20px' }}>
            {/* File Upload Button */}
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                accept="image/jpeg, image/png"
                onChange={handleChange}
            />
            <Button
                component="label"
                htmlFor="file-upload"
                sx={{
                    padding: '30px',
                    borderRadius: '8px',
                    border: "3px dashed #4A90E2",
                    backgroundColor: Theme.primary[10],
                    color: Theme.white[100],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: 'pointer',
                    height: "18vh",
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                    textWrap:"noWrap",
                    mb:"10px",
                    '&:hover': {
                        backgroundColor: Theme.primary[100],
                        transform: 'scale(1.05)'
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                }}
            >
                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "40px" }} />
                Upload Image
            </Button>

            {/* Display Selected File Name */}
            {fileName && (
                <Typography sx={{ fontSize: '14px', marginTop: '10px', color: '#fff' }}>
                    {fileName}
                </Typography>
            )}

            {sliderValues && Object.keys(sliderValues).map((key) => (
                <Box key={key} sx={{ marginBottom: '20px', textAlign: 'left',  lineHeight:"0.1px" }}>
                    <Typography sx={{textTransform:"upperCase", color: Theme.white[100], fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', }}>
                        {key}: {sliderValues[key]}
                    </Typography>
                    <Slider
                        value={sliderValues[key]}
                        onChange={(e, newValue) => onSliderChange(key, newValue)}
                        min={sliderLimit[key].min}
                        max={sliderLimit[key].max}
                        sx={{
                            color: Theme.primary[100],
                            '& .MuiSlider-thumb': {
                                width: 18,
                                height: 18,
                                backgroundColor: Theme.white[100],
                            },
                            '& .MuiSlider-track': {
                                height: 6,
                            },
                            '& .MuiSlider-rail': {
                                height: 6,
                                backgroundColor: Theme.grey[100],
                            },
                        }}
                    />
                    {/* Min & Max Value Display */}
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', color: Theme.grey[100], fontSize: '14px' }}>
                        <Typography>Min: {sliderLimit[key].min}</Typography>
                        <Typography>Max: {sliderLimit[key].max}</Typography>
                    </Box> */}
                </Box>
            ))}


            {/* Generate Button */}
            <Button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: loading ? '#B0BEC5' : '#4CAF50',
                    color: Theme.white[100],
                    fontWeight: 'bold',
                    boxShadow: loading ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: loading ? Theme.grey[100] : Theme.white[100],
                        color: loading ? Theme.white[100] : Theme.primary[100],
                        boxShadow: loading ? 'none' : '0px 6px 12px rgba(0, 0, 0, 0.3)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                }}
            >
                {loading ? 'Generating...' : 'Generate'}
            </Button>

            {/* Error Message */}
            {errorMessage && (
                <Typography
                    variant="body2"
                    sx={{
                        color: Theme.white[100],
                        marginTop: '15px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default Video_Input_Section;

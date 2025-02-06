import React from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';


const Image_Input_section = ({ prompt, handleChange, handleSubmit, loading }) => {
    return (
        <>
            <Typography variant="h5" sx={{ mb: 2, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", textTransform: "uppercase", }}>
                Generate Images
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    // label=""
                    placeholder="Describe your image "
                    variant="outlined"
                    value={prompt}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            fontSize: "clamp(0.9rem, 2vw, 1rem)",
                            color: "white",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.6)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#007bff",
                        },
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#007bff",
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        py: 1.5,
                        "&:hover": {
                            backgroundColor: "#0056b3",
                        },
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Generate"}
                </Button>
            </form>
        </>
    )
}

export default Image_Input_section;
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getuser } from '../Component/Navbar';
import Theme, { GlobleVariable } from "../../Theme";
import axios from 'axios';
import Imgside from "../Component/sidebar_feacture/Imgside";
import Video_Input_Section from '../Page_Component/Video_Generation/Video_Input_Section';
import Video_Output_Section from '../Page_Component/Video_Generation/Video_Output_Section';

const Videogen = () => {
    let Backend_url = GlobleVariable.Backend_url;

    const [inputFile, setInputFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');

    // State object for slider values
    const [sliderValues, setSliderValues] = useState({
        seed:0,
        cfg_scale: 1,
        motion_bucket_id:1,
        num_frames:1,
    });

    const sliderLimits = {
        seed: { min: 0, max: 1000 },
        cfg_scale: { min: 3, max: 7 },
        motion_bucket_id: { min: 1, max: 150 },
        num_frames: { min: 1, max: 124 },
    };

    const userdata = getuser();

    const handleSliderChange = (key, value) => {
        setSliderValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const acceptedFileTypes = ['image/jpeg', 'image/png'];
            if (!acceptedFileTypes.includes(file.type)) {
                setErrorMessage('Only JPEG and PNG formats are allowed.');
                e.target.value = '';
                return;
            }

            const img = new Image();
            img.onload = () => {
                const { width, height } = img;
                const acceptedSizes = [
                    { width: 1024, height: 576 },
                    { width: 576, height: 1024 },
                    { width: 768, height: 768 },
                ];

                if (!acceptedSizes.some((size) => width === size.width && height === size.height)) {
                    setErrorMessage('Invalid image size. Only 1024x576, 576x1024, or 768x768 are allowed.');
                    e.target.value = '';
                } else {
                    setInputFile(file);
                    setFileName(file.name);
                    setErrorMessage('');
                }
            };

            img.onerror = () => {
                setErrorMessage('Unable to read image file.');
                e.target.value = '';
            };

            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        let apiKey = GlobleVariable.getCurrentApiKey();
        if (e) e.preventDefault();
        if(!inputFile){ return }

        setLoading(true);
        setErrorMessage('');
        setVideoUrl('');

        const checkcredit = await axios.post(`${Backend_url}/checkcredit`, userdata);
        if (checkcredit.data.mtype === "warning") {
            setErrorMessage("Insufficient Credits");
            setLoading(false);
            return;
        } else if (checkcredit.data.mtype === "fail") {
            setErrorMessage("Please Login First");
            return;
        }

        const data = new FormData();
        data.append('image', inputFile);
        data.append('seed', sliderValues.seed);
        data.append('cfg_scale', sliderValues.cfg_scale);
        data.append('motion_bucket_id', sliderValues.motion_bucket_id);

        try {
            // console.log(FormData)
            const response = await axios.post(
                'https://api.stability.ai/v2beta/image-to-video',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data && response.data.errors) {
                GlobleVariable.switchApiKey();
                await handleSubmit(e);
                setErrorMessage(response.data.errors[0]);
                return;
            }

            setGeneratedId(response.data.id);
        } catch (error) {
            GlobleVariable.switchApiKey();
            await handleSubmit(e);
            setErrorMessage(`Error: ${error.message || 'Unknown error occurred.'}`);
            setLoading(false);
        }
    };

    const fetchVideo = async (generatedId) => {
        let apiKey = GlobleVariable.getCurrentApiKey();

        try {
            const response = await axios.get(
                `https://api.stability.ai/v2beta/image-to-video/result/${generatedId}`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        Accept: 'video/*',
                    },
                    responseType: 'blob',
                }
            );

            if (response.status === 202) {
                setTimeout(() => fetchVideo(generatedId), 10000);
            } else if (response.status === 200) {
                const videoBlob = response.data;
                const url = URL.createObjectURL(videoBlob);
                setVideoUrl(url);
                setLoading(false);
                await axios.post(`${Backend_url}/genrateduserdata`, { userdata, generatedId });
            } else {
                setLoading(false);
                throw new Error(`Response ${response.status}: ${response.data.toString()}`);
            }
        } catch (error) {
            setErrorMessage(`Error fetching video: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (generatedId) {
            fetchVideo(generatedId);
        }
    }, [generatedId]);

    return (
        <>
            <Box sx={{ display: "flex", minHeight: "80vh", gap: 1, mb: 1 }}>
                <Imgside />
                <Box sx={{
                    width: "20%",
                    p: 2,
                    backgroundColor: Theme.primary[50],
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    gap: 1,
                    overflow: "hidden"
                }}>
                    <Video_Input_Section 
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errorMessage={errorMessage}
                        fileName={fileName}
                        loading={loading}
                        sliderValues={sliderValues}
                        onSliderChange={handleSliderChange}
                        sliderLimit={sliderLimits}
                    />
                </Box>

                <Box sx={{
                    width: "75%",
                    backgroundColor: Theme.primary[50],
                    color: "white",
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Video_Output_Section loading={loading} videoUrl={videoUrl} />
                </Box>
            </Box>
        </>
    );
};

export default Videogen;

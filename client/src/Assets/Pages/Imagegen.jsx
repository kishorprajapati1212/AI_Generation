import React, { useState } from "react";
import { Box } from "@mui/material";
import Theme, { GlobleVariable } from "../../Theme";
import { getuser } from '../Component/Navbar';
import Imgside from "../Component/sidebar_feacture/Imgside";
import axios from "axios";
import Image_Output_section from "../Page_Component/Image_Generation/Image_Output_section";
import Image_Input_section from "../Page_Component/Image_Generation/Image_Input_section";

const Imagegen = () => {
  const Backend_url = GlobleVariable.Backend_url;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const userdata = getuser();

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

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

      const formData = new FormData();
      formData.append('prompt', prompt);
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
        await axios.post(`${Backend_url}/saveimagedata`, { imageDataObject });

        setImageUrl(response.data.image);
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
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = `data:image/webp;base64,${imageUrl}`;
    a.download = 'generated_image.jpg';
    a.click();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "80vh", gap: 1, mb: 1 }}>
      {/* Sidebar */}
      <Imgside />

      {/* Input Section */}
      <Box sx={{
        width: "20%", p: 2, backgroundColor: `${Theme.primary[50]}`, display: "flex", flexDirection: "column",
        color: "white", gap: 1, overflow: "hidden"
      }}>
        <Image_Input_section prompt={prompt} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
      </Box>

      {/* Output Section */}
      <Box sx={{
        width: "75%", backgroundColor: `${Theme.primary[50]}`, color: "white", p: 3, display: "flex",
        justifyContent: "center", alignItems: "center",
      }}>
        <Image_Output_section imageUrl={imageUrl} loading={loading} handleDownload={handleDownload} />
      </Box>
    </Box>
  );
};

export default Imagegen;

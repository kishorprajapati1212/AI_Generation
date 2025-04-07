import React from "react";
import Firstcontainer from "../Component/Home_Page/Firstcontainer";
import Secondcontainer from "../Component/Home_Page/Secondcontainer";
import Responsivegallry from "../UI-Test/Responsivegallry";

const Home = () => {
  const Heightsize = "80vh";

  const sections = [
    {
      Header: "Image Generation",
      Header_summary:
        "A clean and professional scene showcasing an AI-powered image generation feature. The interface displays a user entering a text prompt, with the AI creating a vibrant, high-quality image in real time. The background is minimal, with subtle glowing lines representing AI technology.",
      Header_url: "/Image_generation",
      Header_Button_text: "Image Generation",
      Header_Image_src: "/model/Aimg1.jpg",
      Direaction: false,
    },
    {
      Header: "Video Generation",
      Header_summary:
        "A simple and professional interface showcasing an AI video generation feature. Users enter a text prompt, and the AI creates a high-quality video preview instantly. The layout is clean, with clear options to customize or finalize the video. Smooth animations illustrate the video creation process.",
      Header_url: "/Video_generation",
      Header_Button_text: "Video Generation",
      Header_Image_src: "/model/Aimg2.jpg",
      Direaction: true,
    },
    {
      Header: "Sky Generation",
      Header_summary: "Create beautiful sky scenes effortlessly. Customize colors and cloud patterns. Generate realistic skies for any environment. Perfect for creative projects.",
      Header_url: "/Skybox_generation",
      Header_Button_text: "SkyBox Generation",
      Header_Image_src: "/model/Aimg1.jpg",
      Direaction: false,
    },
  ];

  return (
    <div>
      <Firstcontainer Heightsize={Heightsize} />
      {sections.map((section, index) => (
        <Secondcontainer key={index} {...section} />
      ))}
      <Responsivegallry />
    </div>
  );
};

export default Home;

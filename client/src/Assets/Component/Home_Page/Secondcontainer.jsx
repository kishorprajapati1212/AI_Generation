import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


const Secondcontainer = ({ Header, Header_summary, Header_url, Direaction, Header_Button_text, Header_Image_src }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const show = Direaction === true;

  return (
    <>
    
    <Box
      ref={ref}
      sx={{
        backgroundColor: 'black',
        padding:'50px',
        margin:'20px 0',
        width: '100%',
        // padding: '20px',
        height: '60vh',
        display: 'flex',
        flexDirection: show ? 'row' : 'row-reverse',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={Header_Image_src}
        alt="Image 1"
        sx={{
          // border:"10px solid black",
          width: '50%',
          height: '100%',
          objectFit: 'cover',
          borderRadius:'20px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : `scale(${show ? '30%' : '0%'})`,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease',
          // border:"10px solid black"
        }}
      >
        {/* Header Text with Wave Effect */}
        <Box sx={{ position: 'relative', lineHeight: 1, mb: 2 }}>
          {/* Solid White Text Layer */}
          <Typography
            variant="h4"
            component="span"
            sx={{
              color: 'white',
              fontWeight: '600',
              fontSize: '70px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {Header}
          </Typography>

          {/* Wave Effect Text Layer */}
          <Typography
            variant="h4"
            component="span"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              fontSize: '70px',
              fontWeight: 'bold',
              zIndex: 2,
              background: '#1Ca3De',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'colorWave 4s linear infinite, clipWave 4s linear infinite',
            }}
          >
            {Header}
          </Typography>
        </Box>

        {/* Summary and Button */}
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body1" sx={{ mb: 2, color:"darkgray" , textAlign:"left", padding:"5px 50px"}}>{Header_summary}</Typography>
          <Button variant="contained" component={Link} to={Header_url}>
            {Header_Button_text}
          </Button>
        </Box>
      </Box>
      

      {/* Styling for Wave Animation */}
      <style>{`
        @keyframes colorWave {
          100% { background-position: 100% 50%; }
        }

        @keyframes clipWave {
          0% {
            clip-path: polygon(0 50%, 10% 60%, 20% 55%, 30% 70%, 40% 65%, 50% 80%, 60% 75%, 70% 60%, 80% 70%, 90% 55%, 100% 50%, 100% 100%, 0 100%);
          }
          50% {
            clip-path: polygon(0 30%, 10% 40%, 20% 50%, 30% 30%, 40% 40%, 50% 20%, 60% 30%, 70% 40%, 80% 20%, 90% 30%, 100% 50%, 100% 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 50%, 10% 60%, 20% 55%, 30% 70%, 40% 65%, 50% 80%, 60% 75%, 70% 60%, 80% 70%, 90% 55%, 100% 50%, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </Box>
    
    </>
  );
};

export default Secondcontainer;

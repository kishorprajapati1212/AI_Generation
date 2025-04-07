import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Firstcontainer = () => {
  return (
    <Box sx={{ color: "white", position: "relative", height: '90vh', overflow: 'hidden' }}>
      <Grid container>
        <Grid item xs={12}>
          <video autoPlay loop muted style={{  height: '100%', width: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src="/react41.mp4" type="video/mp4" />
          </video>

          <Typography sx={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%)',
            color: 'white',
            zIndex: 2,
            width: "60%",
            fontWeight:"500",
            fontSize:"3.5rem",
            lineHeight: 1.1,
          }}

          >
            Activating humanity's potential through <span style={{color:"yellow", fontWeight: 600, fontStyle:"𝒽𝒾𝑔𝒽𝓁𝒾𝑔𝒽𝓉𝓈",}}>
            𝐆𝖾𐓣𝖾𝗋α𝗍𝗂𝗏𝖾 𝐀𝚰

            </span>
            <Typography sx={{mt:"30px", width: "50%", fontSize:"1.9rem", fontWeight:"500", lineHeight: 1,}}>
              Open models in every modality,
              for everyone, everywhere.
            </Typography>
          </Typography>
        </Grid>
      </Grid>


    </Box>
  );
}

export default Firstcontainer;

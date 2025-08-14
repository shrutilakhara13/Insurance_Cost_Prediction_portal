import React from 'react';
import AOS from 'aos';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';

import HeroButtons from '../components/HeroButtons';

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true });

  React.useEffect(() => {
    AOS.init({
      once: true,
      delay: 50,
      duration: 600,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Box
      maxWidth={{ sm: 720, md: 1236 }}
      width={1}
      margin='0 auto'
      paddingTop={10}
      backgroundColor={theme.palette.background.default}
    >
      <Grid container spacing={4} marginTop='20px' justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box
            data-aos={isMd ? 'fade-right' : 'fade-up'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Box marginBottom={2}>
              <Typography
                variant='h1'
                color={theme.palette.text.primary}
                marginTop='30px'
              >
                Fill in the family details
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography
                variant='h4'
                color={theme.palette.text.secondary}
                paddingTop={3}
                paddingBottom={3}
                marginBottom='15px'
              >
                Website will tell the Insurance Cost of the family
              </Typography>
            </Box>
            <HeroButtons />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;

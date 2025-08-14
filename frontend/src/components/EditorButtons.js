import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/SendToMobile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const EditorButtons = ({ submitOnClick, resetOnClick, downloadOnClick }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true });

  return (
    <Box
      display="flex"
      flexDirection={isMd ? 'row' : 'column'} // row on desktop, column on mobile
      alignItems={isMd ? 'flex-start' : 'stretch'}
      justifyContent="flex-start"
      gap={2} // space between buttons (works both vertically & horizontally)
      mt={4}
      width="100%"
    >
      {/* Get Data Button */}
      <Button
        variant="contained"
        color="primary"
        size="medium"
        startIcon={<SendIcon />}
        fullWidth={!isMd} // full width if on mobile
        disableElevation
        onClick={submitOnClick}
        sx={{
          padding: '14px 30px',
          fontSize: '18px',
          border: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            border: `2px solid ${theme.palette.primary.main}`
          }
        }}
      >
        Get Data
      </Button>

      {/* Download Button */}
      <Button
        variant="outlined"
        size="medium"
        color="secondary"
        startIcon={<PictureAsPdfIcon />}
        fullWidth={!isMd}
        disableElevation
        onClick={downloadOnClick}
        sx={{
          padding: '14px 30px',
          fontSize: '18px',
          border: `2px solid ${theme.palette.secondary.main}`,
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.secondary,
            border: `2px solid ${theme.palette.secondary.main}`
          }
        }}
      >
        Download
      </Button>
    </Box>
  );
};

export default EditorButtons;

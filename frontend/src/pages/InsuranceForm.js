import React, { useState, createRef } from "react";
import { Helmet } from 'react-helmet-async';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import CustomAlert from './../components/CustomAlert';
import EditorButtons from './../components/EditorButtons';
import EditorHeader from './../components/EditorHeader';
import Spacer from './../components/Spacer';

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { green } from "@mui/material/colors";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InsuranceForm = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true });

  const [send, setSend] = useState(false);
  const [result, setResult] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    bmi: "",
    children: "",
    smoker: "",
    region: "",
  });
  const [prediction, setPrediction] = useState(null);
  const canvasRef = createRef();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const modifiedFormData = {
    age: Number(formData.age),
    sex: Number(formData.sex),
    bmi: Number(formData.bmi),
    children: Number(formData.children),
    smoker: Number(formData.smoker),
    region: Number(formData.region),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        body: JSON.stringify(modifiedFormData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setSend(true);
      setResult(true);
      setPrediction(data.prediction);  // Set prediction properly here
      console.log(data.prediction);
      console.log(modifiedFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const documentDefinition = {
      content: [   // fixed key from 'context' to 'content'
        { text: "Insurance", style: "header" },
        { text: "Age: " + formData.age },
        { text: "Sex: " + (formData.sex === "0" ? "Male" : "Female") },
        { text: "BMI: " + formData.bmi },
        { text: "Children: " + formData.children },
        { text: "Smoker: " + (formData.smoker === "0" ? "Smoker" : "Non-smoker") },
        {
          text: "Region: " +
            (formData.region === "0" ? "Southeast" :
            formData.region === "1" ? "Southwest" :
            formData.region === "2" ? "Northwest" : "Northeast")
        },
        { text: "Prediction: " + `$${prediction}` }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download("InsuranceDetail.pdf");
  };

  return (
    <>
      <Helmet>
        <title>Form</title>
      </Helmet>
      <Box backgroundColor={theme.palette.background.default} minHeight='100%' pt={15} pb={15}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid container alignItems='center' justifyContent='space-between' mt='-30px' spacing={3} xs={12}>
              <Grid item>
                <EditorHeader />
              </Grid>
              <Grid item xs={12}>
                {send && (
                  <CustomAlert variant='outlined' severity='success' title='Success'>
                    Successfully sent the detail to the machine learning model
                  </CustomAlert>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} margin="normal" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="BMI" type="number" name="bmi" value={formData.bmi} onChange={handleChange} margin="normal" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Smoker"
                          select
                          name="smoker"
                          value={formData.smoker}
                          onChange={handleChange}
                          margin="normal"
                          fullWidth
                        >
                          <MenuItem value='0'>Smoker</MenuItem>
                          <MenuItem value='1'>Non-Smoker</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Sex"
                          select
                          name="sex"
                          value={formData.sex}
                          onChange={handleChange}
                          margin="normal"
                          fullWidth
                        >
                          <MenuItem value='0'>Male</MenuItem>
                          <MenuItem value='1'>Female</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Children" type="number" name="children" value={formData.children} onChange={handleChange} margin="normal" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Region"
                          select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          margin="normal"
                          fullWidth
                        >
                          <MenuItem value='0'>Southeast</MenuItem>
                          <MenuItem value='1'>Southwest</MenuItem>
                          <MenuItem value='2'>Northwest</MenuItem>
                          <MenuItem value='3'>Northeast</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display='flex' justifyContent='center' mb={2} mt={2}>
                      <Typography variant="h2" align="center" gutterBottom>
                        Result
                      </Typography>
                    </Box>
                    <Box justifyContent='center'>
                      {result && (
                        <>
                          <Typography variant="h5" align="center" gutterBottom>
                            The machine learning model has predicted the cost of Insurance:
                          </Typography>{"\n"}
                          <Typography variant="h1" align="center" gutterBottom>
                            <span style={{ color: green[600], fontSize: '50px' }}>
                              {`$${prediction}`}
                            </span>
                          </Typography>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Box margin={4}>
                  <EditorButtons submitOnClick={handleSubmit} downloadOnClick={handleDownload} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Spacer sx={{ pt: 6 }} />
    </>
  );
};

export default InsuranceForm;

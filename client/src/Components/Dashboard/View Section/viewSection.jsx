import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Stack, Typography, Slider, Button, Box, Tooltip, Grid, styled } from '@mui/material';
import MuiInput from '@mui/material/Input'

import '../View Section/viewSection.css';
import Up from "../Up Section Closed/upSection";


const Input = styled(MuiInput)`
  width: 35px;
`;

const socketServerURL = "http://localhost:3000";

const View = () => {
  const [socket, setSocket] = useState(null);
  const [pidValues, setPidValues] = useState({
    P: 0,
    I: 0,
    D: 0
  });

  const [levels, setLevels] = useState({
    tankLevel: 0,
    flowLevel: 0,
    temperatureLevel: 0
  });

  const inputLabels = {
    P: "Kp",
    I: "Tr",
    D: "Td"
  };

  const barrLabels = {
    tankLevel: "TK",
    flowLevel: "F",
    temperatureLevel: "T"
  };

  useEffect(() => {
    const socketInstance = io(socketServerURL);

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    socketInstance.on('data', (data) => {
      console.log("Datos del servidor:", data);
      setLevels({
        tankLevel: data.tankLevel,
        flowLevel: data.flowLevel,
        temperatureLevel: data.temperatureLevel
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSliderChange = (name) => (event, newValue) => {
    setPidValues((prevValues) => ({
      ...prevValues,
      [name]: newValue
    }));
  };

  const handleInputChange = (name) => (event) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    setPidValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleBlur = (name) => () => {
    if (pidValues[name] < 0) {
      setPidValues((prevValues) => ({
        ...prevValues,
        [name]: 0
      }));
    } else if (pidValues[name] > 10) {
      setPidValues((prevValues) => ({
        ...prevValues,
        [name]: 10
      }));
    }
  };

  const handleStartClick = () => {
    if (socket) {
      socket.emit('message', 'Hola desde React');
    }
  };

  const handleResetClick = () => {
    setPidValues({
      P: 0,
      I: 0,
      D: 0
    });
    setLevels({
      tankLevel: 0,
      flowLevel: 0,
      temperatureLevel: 0
    });
  };

  return (
    <div className='viewMain'>
      <Up />
      <div className='viewContent flex'>
        <div className="containerCloseCards">
          <div className="Cards1 flex"></div>
          <div className="Cards2 flex"></div>
        </div>
        <div className="containerControl">
          <div className="Cardspid flex">
            <Grid container spacing={2} sx={{ mb: -2 }}>
              <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                  {['tankLevel', 'flowLevel', 'temperatureLevel'].map((name) => (
                    <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 120 }}>
                      <Typography>{barrLabels[name]}</Typography>
                      <Box sx={{ ml: 1.3, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', height: '100%', width: 30, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                        <Tooltip title={`${levels[name]}%`} arrow>
                          <Box
                            sx={{
                              backgroundColor: 'primary.main',
                              height: `${levels[name]}%`,
                              width: '100%',
                              transition: 'height 0.3s ease'
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mr: 2 }}>
              <Grid item>
                <Stack spacing={2} direction="column">
                  {['P', 'I', 'D'].map((name) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ mr: 1 }}>{inputLabels[name]}</Typography>
                      <Input
                        key={name}
                        value={pidValues[name]}
                        size="small"
                        onChange={handleInputChange(name)}
                        onBlur={handleBlur(name)}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 10,
                          type: 'number',
                          'aria-labelledby': `input-slider-${name}`,
                        }}
                      />
                    </div>
                  ))}
                </Stack>
              </Grid>
              <Grid item>
                <Stack sx={{ height: 110, ml: 0, mt: 0 }} spacing={1} direction="row">
                  {['P', 'I', 'D'].map((name) => (
                    <div key={name} style={{ textAlign: 'center' }}>
                      <Typography id={`input-slider-${name}`}>{name}</Typography>
                      <Slider
                        sx={{
                          color: 'black',
                          '& .MuiSlider-thumb': {
                            borderRadius: '4px',
                          },
                          height: '80px'
                        }}
                        aria-label={name}
                        orientation="vertical"
                        valueLabelDisplay="auto"
                        value={typeof pidValues[name] === 'number' ? pidValues[name] : 0}
                        onChange={handleSliderChange(name)}
                        marks
                        min={0}
                        max={10}
                        aria-labelledby={`input-slider-${name}`}
                      />
                    </div>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <div className="buttonControl flex">
              <Stack sx={{ml:-1, p:.5}}spacing={1} direction="column">
                <Button variant="contained" color="success" onClick={handleStartClick}>Start</Button>
                <Button variant="contained" color="error">Stop</Button>
                <Button variant="contained" color="primary" onClick={handleResetClick}>Reset</Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
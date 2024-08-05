import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { Stack, Typography, Slider, Button, Box, Tooltip, Grid, styled } from '@mui/material';
import MuiInput from '@mui/material/Input';

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import '../ViewMeasuring/viewMeasuring.css';
import Up from "../Up Section Closed/upSection";

const Input = styled(MuiInput)`
  width: 35px;
`;

const socketServerURL = "http://localhost:3000";

const ViewMeasuring = () => {

  const [pidValues, setPidValues] = useState({
    P: 0,
    I: 0,
  });

  const inputLabels = {
    P: "Kp",
    I: "Tr",
  };

  const handleInputChange = (name) => (event) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    setPidValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
    if (name === 'SP') {
      setLevels((prevLevels) => ({
        ...prevLevels,
        tankLevel: value
      }));
      setChartData((prevChartData) => {
        const newChartData = { ...prevChartData };
        newChartData.datasets[1].data.push(value);
        newChartData.labels.push(new Date().toLocaleTimeString());
        return newChartData;
      });
    }
    if (socket) {
      socket.emit('pidValuesChange', { [name]: value });
    }
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

  const handleSliderChange = (name) => (event, newValue) => {
    setPidValues((prevValues) => ({
      ...prevValues,
      [name]: newValue
    }));
    if (name === 'SP') {
      setLevels((prevLevels) => ({
        ...prevLevels,
        tankLevel: newValue
      }));
      setChartData((prevChartData) => {
        const newChartData = { ...prevChartData };
        newChartData.datasets[1].data.push(newValue);
        newChartData.labels.push(new Date().toLocaleTimeString());
        return newChartData;
      });
    }
    if (socket) {
      socket.emit('pidValuesChange', { [name]: newValue });
    }
  };

  return (
    <div className='viewMain'>
      <Up />
      <div className='viewMeasuring flex'>
        <div className="containerMeasuringCards">
          <div className="cardMeasuring1 flex"></div>
          <div className="cardMeasuring2 flex">
          </div>
        </div>
        <div className="containerMeasuringControl">
          <div className="CardspidControl flex">
          <Grid container spacing={1} sx={{ mr: 2, mt:-3 }}>
              <Grid item>
                <Stack spacing={1} direction="column">
                  {['P', 'I'].map((name) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ mr: 1 }}>{inputLabels[name]}</Typography>
                      <Input
                        sx={{mt:3}}
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
                <Stack sx={{ height: 110, ml: 0, mt: 1.3 }} spacing={1} direction="row">
                  {['P', 'I'].map((name) => (
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
                <Button variant="contained" color="success">Start</Button>
                <Button variant="contained" color="error">Stop</Button>
                <Button variant="contained" color="primary">Reset</Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMeasuring
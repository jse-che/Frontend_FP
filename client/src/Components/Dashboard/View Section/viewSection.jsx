import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { Stack, Typography, Slider, Button, Box, Tooltip, Grid, styled } from '@mui/material';
import MuiInput from '@mui/material/Input';

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

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
    D: 0,
    SP: 0 
  });

  const [levels, setLevels] = useState({
    tankLevel: 0,
    flowLevel: 0,
    temperatureLevel: 0
  });

  const inputLabels = {
    P: "Kp",
    I: "Tr",
    D: "Td",
    SP: "Sp"
  };

  const barrLabels = {
    tankLevel: "SP",
    flowLevel: "PV",
    temperatureLevel: "CP"
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'X',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 0
      },
      {
        label: 'SP',
        data: [],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        pointRadius: 0
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {},
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: pidValues.SP,
            yMax: pidValues.SP,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            label: {
              content: 'SP',
              enabled: true,
              position: 'end',
              backgroundColor: 'rgb(255, 99, 132)',
              color: '#fff',
              font: {
                size: 12
              }
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Tiempo'
        }
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Valor'
        }
      }
    }
  };

  useEffect(() => {
    const socketInstance = io(socketServerURL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    socketInstance.on('data', (data) => {
      console.log("Datos del servidor:", data);
      setLevels((prevLevels) => ({
        ...prevLevels,
        flowLevel: data.flowLevel,
        temperatureLevel: data.temperatureLevel
      }));
    });

    socketInstance.on('message', (data) => {
      console.log("Mensaje del servidor:", data);
      setChartData((prevChartData) => {
        const newChartData = { ...prevChartData };
        newChartData.labels.push(new Date().toLocaleTimeString());
        newChartData.datasets[0].data.push(data.value);
        return newChartData;
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

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
      D: 0,
      SP: 0
    });
    setLevels({
      tankLevel: 0,
      flowLevel: 0,
      temperatureLevel: 0
    });
    setChartData({
      labels: [],
      datasets: [
        {
          label: 'X',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointRadius: 0
        },
        {
          label: 'SP',
          data: [],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
          pointRadius: 0
        }
      ]
    });
  };

  return (
    <div className='viewMain'>
      <Up />
      <div className='viewContent flex'>
        <div className="containerCloseCards">
          <div className="cardControl1 flex"></div>
          <div className="cardControl2 flex">
            <Line data={chartData} options={chartOptions} />
          </div>
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
                        <Tooltip title={`${levels[name]}`} arrow>
                          <Box
                            sx={{
                              backgroundColor: 'primary.main',
                              height: `${levels[name] * 10}%`,
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
                <Stack spacing={1} direction="column">
                  {['P', 'I', 'D', 'SP'].map((name) => (
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
                <Stack sx={{ height: 110, ml: 0, mt: 1.3 }} spacing={1} direction="row">
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


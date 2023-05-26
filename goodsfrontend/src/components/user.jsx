import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import axios, { formToJSON } from "axios";
import { styled } from '@mui/system';
import address from '../index.js';

const BackgroundImage = styled(Box)`
      background-image: url('https://img1.akspic.ru/attachments/crops/5/6/3/8/2/128365/128365-vegetarianskaya_pishha-banan-mestnoe_blyudo-pishha-frukty-1920x1080.jpg');
      background-size: cover;
      background-position: center;
      height: 532px;
    `;
    const Content = styled(Box)`
      width: 100%;
      padding-top: 10px;
      display: flex;
      justify-content: center;
      color: white;
    `;

export function User() {
    const paperStyle = {padding: '5px 10px', width:950, margin:"30px auto", textAlign: 'left'};
    const[name, setName]=React.useState([])
    const[mail, setMail]=React.useState([])
    const[address, setAddress]=React.useState([])
    const[password, setPassword]=React.useState([])
    const[users, setUsers]=React.useState([])


    const post = (data = {}) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://37.140.199.26:8080/api/v1/auth/register`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config).then(response => {
            console.log(response.data);
            localStorage.token = response.data.access_token;
            window.location.replace("/profile");
          //console.log(response.data);
        })
        .catch(error => {
          //setError(true)
          console.log(error.config);
        })
    };    
  return (
    <BackgroundImage>
        <Content>
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{textAlign: "center"}}>Registration</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" size="small" label="Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" size="small" label="Password" variant="outlined" fullWidth
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <TextField id="outlined-basic" size="small" label="Email" variant="outlined" fullWidth
      value={mail}
      onChange={(e)=>setMail(e.target.value)}
      />
      <TextField id="outlined-basic" size="small" label="Address" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" onClick={() =>post({'name': name, "mail": mail, "address": address,"password": password})} sx={{background: "#3a3e43", width: "95px"}} style={{width: "95px"}}>Register</Button>
    </Box>
    </Paper>
    </Container>
    </Content>
      </BackgroundImage>
  );
}

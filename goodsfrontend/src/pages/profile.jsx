import React, { useState, useEffect } from 'react'
import {Link,useLocation} from "react-router-dom";
import axios from "axios";
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Switch, {SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/system';

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

function Profile(){
  const paperStyle = { padding: '5px 10px', width: 600, margin: "30px auto", textAlign: "left", backgroundColor: 'black'};
    const [person, setPerson] = useState(false);
    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        async function postRequest(){
          let config = {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          };
          axios.get('http://localhost:8080/api/v1/auth/profile',config).then(response => {
              console.log(response.data);
              localStorage.role = response.data.role;
              setPerson(response.data);
            })
            .catch(error => {
              console.log(error.config);
            })
        };
        if ("/profile" == location.pathname){
        postRequest()};
      },["/profile" == url ? true: false]);

    const exit = () => { window.location.replace("/"); localStorage.clear();}
    return(
      <BackgroundImage>
        <Content>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ textAlign: "center", color: "white"}}>Profile</h1>
          {person.name ?(
            <>
                <Paper elevation={6} style={{ margin: "5px", padding: "10px", textAlign: "left" }}>
                <h2>Name: {person.name}</h2>
                <h3>Email: {person.mail}</h3>
                <h3>Role: {person.role}</h3>
                </Paper>
                <Paper elevation={6} style={{ margin: "5px", padding: "10px", textAlign: "left" }}>
                <Link to="/api/v1/auth/cart">Your cart</Link><br/>
                    {person.role == "MANAGER" ?
                    <Link to="/goods/add">Add a new product</Link>:
                    null
                    }
                </Paper>
              
              
            </>
          ):
          (
            <>Loading...</>
          )}
          
        </Paper>
        <Button style={{ margin: "10px", textAlign: "left", background: "red", color: "white" }} onClick={exit}>Exit</Button>
      </Container>
      </Content>
      </BackgroundImage>
    )
}

export default Profile;
import React, { useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Switch, {SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

function Query() {
    const [page, setPage] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const filter = params.get('name');
    const paperStyle = {padding: '5px 10px', width: 600, margin:"30px auto", textAlign: "left"}

    const handleClick1 = (data = {}) => {
      let controller = new AbortController();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/v1/auth/addcart',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data : data
          }
      axios.request(config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.config);
        });
        controller.abort()
    }

    const handleClick = (goodId) => {
      console.log(localStorage.role);
      let config = {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }}
    axios.delete(`http://localhost:8080/goods/del?goodId=${goodId}`,config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.config);
      });
  }
  
    useEffect(() => {
      function fetchData() {
        axios.get("http://localhost:8080/goods/search" + (filter ? ("?name=" + filter) : ""))
          .then(response => {
            setPage(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error.config);
          });
          let config = {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          };
          axios.get('http://localhost:8080/profile',config).then(response => {
            localStorage.role = response.data.role;
            setPage(response.data);
          })
          .catch(error => {
            console.log(error.config);
          })
      }
  
      if ("/goods/search" === location.pathname.substring(0, 14)) {
        fetchData();
      }
    }, [location.pathname, filter]);
  
    return (
      <BackgroundImage>
        <Content>
      <div>
        {page.goods ? (
          <div>
            {page.query ? <p>There is nothing for your search</p> : null}
            <Container>
                <Paper elevation={3} style={paperStyle}>
                <h1 style={{textAlign: "center"}}>Search results</h1>
              {page.goods.map(good => (
                <>
                <Paper elevation={6} style={{margin: "5px", padding: "10px", textAlign: "left"}} key={good.id}>
                        Name: {good.name}<br/>
                        Cost: {good.cost} $<br/>
                        Category: {good.description}<br/>
                        Amount available: {good.amount}
                        </Paper>
                        <Button style={{margin: "10px", textAlign: "left", background: "blue", color: "white"}} onClick={() => handleClick1({'good_id' : good.id})}>Add to cart</Button>
                        {localStorage.role == "MANAGER" ? (<Button style={{margin: "10px", textAlign: "left", background: "red", color: "white"}} onClick={() => handleClick(good.id)}>Delete</Button>) : null}
                </>
              ))}
              </Paper>
            </Container>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      </Content>
      </BackgroundImage>
    );
  }
  
  export default Query;
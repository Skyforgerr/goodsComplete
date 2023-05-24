import * as React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Switch, {SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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

export default function Products() {
    const paperStyle = { padding: '5px 10px', width: 600, margin: "30px auto", textAlign: "left" };
    const [products, setProducts] = React.useState([]);
    const navigate = useNavigate();

    const handleClick1 = (data = {}) => {
      let controller = new AbortController();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${address}:8080/api/v1/auth/addcart`,
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
        let config = {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
      axios.delete(`http://${address}:8080/goods/del?goodId=${goodId}`,config)
        .then(response => {
          console.log(response.data);
          navigate.push("/goods/view");
        })
        .catch(error => {
          console.log(error.config);
        });
    }
  
    React.useEffect(() => {
      fetch(`http://${address}:8080/goods/view`)
        .then(res => res.json())
        .then(result => {
          setProducts(result);
        });
    }, []);
  
    return (
      <BackgroundImage>
        <Content>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ textAlign: "center" }}>Products list</h1>
          {products.map(product => (
            <>
              <Paper elevation={6} style={{ margin: "5px", padding: "10px", textAlign: "left" }} key={product.id}>
                <b>Name:</b> {product.name}<br />
                <b>Cost:</b> {product.cost} $<br />
                <b>Category:</b> {product.description}<br />
                <b>Amount available:</b> {product.amount}
              </Paper>
              <Button style={{ margin: "10px", textAlign: "left", background: "blue", color: "white" }} onClick={() => handleClick1({'good_id' : product.id})}>Add to cart</Button>
              {localStorage.role === "MANAGER" ? (
                <Button style={{ margin: "10px", textAlign: "left", background: "red", color: "white" }} onClick={() => handleClick(product.id)}>Delete</Button>
              ) : null}
            </>
          ))}
        </Paper>
      </Container>
      </Content>
      </BackgroundImage>
    );
  }
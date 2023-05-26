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
import address from '../index.js';

function Cart(){
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const url = location.pathname;
    const [productIds, setProductIds] = useState('');
    const paperStyle = { padding: '5px 10px', width: 600, margin: "30px auto", textAlign: "left" };
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

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userEmail = localStorage.getItem('mail');
  
      const orderData = {
        userEmail,
        productIds: productIds.split(',').map((id) => parseInt(id.trim())),
      };
  
      try {
        const response = await fetch(`http://${address}:8080/api/v1/auth/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(orderData),
        });
  
        if (response.ok) {
          // Заказ успешно создан
          console.log('Order created successfully');
        } else {
          // Обработка ошибок
          console.error('Failed to create order');
        }
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };


    const handleClick = (data = {}) => {
      let controller = new AbortController();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${address}:8080/api/v1/auth/deletecart`,
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
        //controller.abort()
    }
    const order = (data = {}) => {
      let controller = new AbortController();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${address}:8080/api/v1/auth/order`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data : data
          }
      axios.request(config)
        .then(response => {
          console.log(response.data);
          const id = data.id;
          console.log(data.id);
        })
        .catch(error => {
          console.log(error.config);
        });
        //controller.abort()
    }


    useEffect(() => {
        async function postRequest(){
          let config = {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          };
          axios.get(`http://${address}:8080/api/v1/auth/cart`,config).then(response => {
              console.log(response.data);
              setPage(response.data);
            })
            .catch(error => {
              console.log(error.config);
            })
        };
        if ("/api/v1/auth/cart" == url){
        postRequest()};
      },["/api/v1/auth/cart" == url ? true: false]);

    return(
      <BackgroundImage>
        <Content>
          
        <div>
            {localStorage.token != null ?
                (
                    <div>
                    {page.cart ? 
                        (
                            <Container>
                            <Paper elevation={3} style={paperStyle}>
                            <Button onClick={handleSubmit} style={{ margin: "10px", textAlign: "left", background: "black", color: "white" }}>Order</Button>
                            <h1 style={{ textAlign: "center" }}>Your cart</h1>
                            {page.cart.map(item => (
                                <>
                                <Paper elevation={6} style={{ margin: "5px", padding: "10px", textAlign: "left" }} key={item.id}>
                                    <b>Name:</b> {item.name}<br />
                                    <b>Cost:</b> {item.cost} $<br />
                                    <b>Category:</b> {item.description}<br />
                                    <b>Amount available:</b> {item.amount}
                                </Paper>
                                <Button style={{ margin: "10px", textAlign: "left", background: "red", color: "white" }} onClick={() => handleClick({'good_id' : item.id})}>Remove from cart</Button>
                                </>
                            ))}
                            </Paper>
                            </Container>
                        ): 
                        (
                            <>Loading...</>
                        )
                    }
                    </div>         
                ):
                null
            }
        </div>
        </Content>
        </BackgroundImage>
    )
}
export default Cart;

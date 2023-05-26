import React, { useEffect, useState } from 'react';
import address from '../index.js';
import axios from 'axios';
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

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Функция для получения данных о заказах
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://${address}:8080/api/v1/auth/orderslist`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <BackgroundImage>
        <Content>
        <Container>
        <Paper elevation={3} style={paperStyle}>
    <div>
      <h2>Order List</h2>
      {orders.map(order => (
        <div key={order.orderId}>
          <h3>Order ID: {order.orderId}</h3>
          <p>User Email: {order.userEmail}</p>
          <h4>Goods:</h4>
          <ul>
            {order.goodsInfo.map((good) => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </Paper>
    </Container>
    </Content>
    </BackgroundImage>
  );
};

export default OrderList;
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
    const paperStyle = {
      padding: '5px 10px',
      width: 950,
      margin: '30px auto',
      textAlign: 'left',
    };

export function NewProduct() {
    const paperStyle = {padding: '5px 10px', width:950, margin:"30px auto", textAlign: 'left'};
    const[name, setName]=React.useState('')
    const[cost, setCost]=React.useState('')
    const[description, setDescription]=React.useState('')
    const[amount, setAmount]=React.useState('')
    const[products, setProducts]=React.useState([])

    const post = (data = {}) => {
      console.log(data);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/goods/add`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
      };
      axios.request(config).then(response => {
          console.log(response.data);
          window.location.href = "/goods/view"
          //console.log(response.data);
        })
        .catch(error => {
          console.log(error.config);
        })
    };
    
    const handleClick=(e)=>{
        const product={name, cost, description, amount}
        console.log(product)
        fetch(`http://${address}:8080/goods/add`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(product)
        }).then(()=>{
            console.log("New product has been added")
        })
    }
  return (
    <BackgroundImage>
        <Content>
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{textAlign: "center"}}>Add a new product</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Name" size="small" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Cost" size="small" variant="outlined" fullWidth
      value={cost}
      onChange={(e)=>setCost(e.target.value)}
      />
      <TextField id="outlined-basic" label="Description" size="small" variant="outlined" fullWidth
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <TextField id="outlined-basic" label="Amount" size="small" variant="outlined" fullWidth
      value={amount}
      onChange={(e)=>setAmount(e.target.value)}
      />
      <Button variant="contained" sx={{width:'20px'}} style={{width:'20px'}}onClick={() => post({
                    'name': name,
                    'cost': cost,
                    'description': description,
                    'amount': amount
                })} sx={{background: "#3a3e43"}}>Add</Button>
    </Box>
    </Paper>
    </Container>
    </Content>
      </BackgroundImage>
  );
}

import * as React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Switch, {SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import address from '../index.js';



export default function Admin(){
    const paperStyle = {padding: '5px 10px', width: 600, margin:"30px auto", textAlign: "left"}
    const[users, setUsers]=React.useState([])

    React.useEffect(()=>{
        fetch(`http://${address}:8080/user/view`)
        .then(res=>res.json())
        .then((result)=>{
            setUsers(result);
        }
        )
    },[])
    return(
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{textAlign: "center"}}>Users list</h1>
        {users.map(user=>(
            <>
            <Paper elevation={6} style={{margin: "5px", padding: "10px", textAlign: "left"}} key={user.id}>
                ID: {user.id}<br/>
                Name: {user.name}<br/>
                Email: {user.mail}<br/>
                Number: {user.phoneNumber}<br/>
                Address: {user.address}
        </Paper>
        <Button style={{margin: "10px", textAlign: "left", background: "red", color: "black"}}>Delete</Button>
        <FormControlLabel control={<Switch/>} label="Moderator" style={{textAlign: "right"}}/>
        </>
        ))
}
    </Paper>
        </Container>
    )
}
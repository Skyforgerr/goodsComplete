import { React } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import address from '../index.js';

export default function Main() {
    const BackgroundImage = styled(Box)`
    background-image: url('https://img1.akspic.ru/attachments/crops/5/6/3/8/2/128365/128365-vegetarianskaya_pishha-banan-mestnoe_blyudo-pishha-frukty-1920x1080.jpg');
    background-size: cover;
    background-position: center;
    height: 532px;
    `;

    const Content = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    color: white;
    `;
    return (
        <BackgroundImage>
            <Content>
                <Typography variant="h4" component="h1" fontFamily="Roboto" color="black" fontWeight="bold">
                Welcome to the GoodsDelivery website!
                </Typography>
            </Content>
        </BackgroundImage>
    );
}
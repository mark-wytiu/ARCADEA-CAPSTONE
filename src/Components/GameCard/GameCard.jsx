import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function GameCard(props) {
    return (
        <Card sx={{
            maxWidth: 200,
            height: 300, marginTop: "100px",
            marginLeft: "2rem"
        }}>
            <CardMedia
                component="img"
                alt="Game Title"
                height="50"
                image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>

        </Card>
    );
}
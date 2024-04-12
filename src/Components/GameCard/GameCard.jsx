import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import gameData from "../../Data/Allgames.json";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import "./GameCard.scss"


export default function GameCard({games}) {
    const navigate = useNavigate();
    const displayGamePage = (id) => {
        navigate(`/game/${id}`)
    }

    const oneGame = games.slice(0,14);

    return (
        <>
            {oneGame.map((game) => (
                <Grid item xs={3} >
                    <Card key={game.id} sx={{
                        maxWidth: 200,
                        height: 350,
                        marginTop: "100px",
                        marginLeft: "2rem",
                        flexWrap: 'wrap',
                        textAlign: 'center',
                        borderRadius: "20px",
                    }}>
                        <CardMedia 
                            onClick={() => displayGamePage(game.id)}
                            component="img"
                            alt={game.title}
                            height="100"
                            image={game.image}
                            sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {game.title}
                            </Typography>
                            <Stack direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
                                <Chip label={game.genre} color="primary" sx={{ width: '7rem' }} />
                                <Chip label={game.developer} color="primary" sx={{ width: '7rem' }} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}

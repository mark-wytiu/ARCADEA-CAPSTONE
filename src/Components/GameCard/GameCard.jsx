import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import gameData from "../../Data/Allgames.json";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'


export default function GameCard() {
    const firstGames = gameData.slice(0, 15);
    return (
        <> {/* Added a container to hold the generated cards */}
            {firstGames.map((game, index) => (
                <Grid item xs={3}>
                <Card key={index} sx={{
                    maxWidth: 200,
                    height: 300,
                    marginTop: "100px",
                    marginLeft: "2rem",
                    flexWrap:'wrap',
                    textAlign:'center'
                }}>
                    <CardMedia
                        component="img"
                        alt={game.title}
                        height="100"
                        image={game.image}
                        sx={{  objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {game.title}
                        </Typography>
                        
                            <Stack direction="column" spacing={2}>
                                <Chip label={game.genre}color="primary" sx={{width:'7rem'}} />
                            </Stack>
                            

                    </CardContent>
                </Card>
                </Grid>
            ))}
        </>
        // <Card sx={{
        //     maxWidth: 200,
        //     height: 300, marginTop: "100px",
        //     marginLeft: "2rem"
        // }}>
        //     <CardMedia
        //         component="img"
        //         alt="Game Title"
        //         height="50"
        //         image="/static/images/cards/contemplative-reptile.jpg"
        //     />
        //     <CardContent>
        //         <Typography gutterBottom variant="h5" component="div">
        //             Lizard
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //             Lizards are a widespread group of squamate reptiles, with over 6,000
        //             species, ranging across all continents except Antarctica
        //         </Typography>
        //     </CardContent>

        // </Card>
    );
}

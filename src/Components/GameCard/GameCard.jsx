import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import gameData from "../../Data/Allgames.json";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function GameCard(props) {
    const firstGames = gameData.slice(0, 15);
    return (
        <div> {/* Added a container to hold the generated cards */}
            {firstGames.map((game, index) => (
                <Card key={index} sx={{
                    maxWidth: 200,
                    height: 300,
                    marginTop: "100px",
                    marginLeft: "2rem"
                }}>
                    <CardMedia
                        component="img"
                        alt={game.title}
                        height="50"
                        image={game.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {game.title}
                        </Typography>
                        
                            <Stack direction="column" spacing={2}>
                                <Chip label={game.genre}color="primary" />
                            </Stack>
                            

                    </CardContent>
                </Card>
            ))}
        </div>
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

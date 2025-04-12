import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import gameImg from "../../Assets/1784571.png";
import "./GameCard.css";

export default function GameCard({ games }) {
    const navigate = useNavigate();
    const displayGamePage = (id) => {
        navigate(`/game/${id}`);
    }

    const displayedGames = games.slice(0, 14);

    return (
        <>
            {displayedGames.map((game) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                    <Card
                        className="game-card"
                        onClick={() => displayGamePage(game.id)}
                        sx={{
                            height: 380,
                            margin: "20px",
                            borderRadius: "12px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)"
                            },
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={game.title}
                            height="180"
                            image={game.image || gameImg}
                            sx={{
                                objectFit: "cover",
                                borderTopLeftRadius: "12px",
                                borderTopRightRadius: "12px"
                            }}
                        />
                        <CardContent sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "16px"
                        }}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    height: "50px",
                                    marginBottom: "16px"
                                }}
                            >
                                {game.title}
                            </Typography>
                            <Stack spacing={1} sx={{ marginTop: "auto" }}>
                                <Chip
                                    label={game.genre}
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: "4px",
                                        marginBottom: "8px",
                                        fontWeight: "medium"
                                    }}
                                />
                                <Chip
                                    label={game.developer}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        borderRadius: "4px",
                                        fontWeight: "medium"
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}

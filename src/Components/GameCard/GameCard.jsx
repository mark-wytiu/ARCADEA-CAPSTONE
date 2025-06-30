import React, { useState } from 'react';
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
import { Rating, Skeleton } from '@mui/material';

export default function GameCard({ games }) {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const displayGamePage = (id) => {
        navigate(`/game/${id}`);
    }

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    return (
        <>
            {games.map((game) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={game.id}>
                    <Card
                        className="game-card"
                        onClick={() => displayGamePage(game.id)}
                        sx={{
                            position: 'relative',
                            height: 350,
                            width: '100%',
                            borderRadius: "12px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)"
                            },
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden"
                        }}
                    >
                        {!imageLoaded && (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={200}
                                animation="wave"
                            />
                        )}
                        <CardMedia
                            component="img"
                            alt={game.title}
                            height="200"
                            image={game.image || gameImg}
                            loading="lazy"
                            onLoad={handleImageLoad}
                            sx={{
                                display: imageLoaded ? 'block' : 'none',
                                objectFit: "contain",
                                backgroundColor: '#f5f5f5',
                                padding: '10px'
                            }}
                        />
                        <CardContent sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "16px",
                            backgroundColor: 'white'
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
                                    height: "48px",
                                    marginBottom: 1.5
                                }}
                            >
                                {game.title}
                            </Typography>
                            <Stack spacing={1} sx={{ marginTop: "auto" }}>
                                <Chip
                                    label={game.genre || "Genre Unknown"}
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: "4px",
                                        marginBottom: "8px",
                                        fontWeight: "medium",
                                        textAlign: "center",
                                        width: 'fit-content'
                                    }}
                                />
                                <Chip
                                    label={game.developer || "Developer Unknown"}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        borderRadius: "4px",
                                        fontWeight: "medium",
                                        textAlign: "center",
                                        width: 'fit-content'
                                    }}
                                />
                            </Stack>
                            <Rating
                                value={game.rating || 0}
                                readOnly
                                precision={0.5}
                                size="small"
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8
                                }}
                            >
                                {game.price ? `$${game.price}` : 'Free'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}

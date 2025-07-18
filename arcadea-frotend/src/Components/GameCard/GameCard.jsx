import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import gameImg from "../../Assets/1784571.png";
import "./GameCard.scss";

const GameCard = React.memo(({ game }) => {
    const navigate = useNavigate();
    const displayGamePage = (id) => {
        navigate(`/game/${id}`);
    }

    return (
        <Card
                        className="game-card"
                        onClick={() => displayGamePage(game.id)}
                        sx={{
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
                        <CardMedia
                            component="img"
                            alt={game.title}
                            height="200"
                            image={game.image || gameImg}
                            loading="lazy"
                            sx={{
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
                        </CardContent>
                    </Card>
    );
});

export default GameCard;

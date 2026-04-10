import * as React from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import gameImg from "../../Assets/1784571.png";
import { gameAPI } from '../../services/api';
import { getGameImageUrlCandidates } from '../../utils/imageSources';
import { getGameId } from '../../utils/gameId';
import "./GameCard.scss";

const prefetchedGameIds = new Set();

const GameCard = React.memo(({ game }) => {
    const navigate = useNavigate();
    const gameId = getGameId(game);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageCandidates = useMemo(
        () => getGameImageUrlCandidates(game.image, gameImg, { cdnWidth: 320 }),
        [game.image]
    );
    const [imageIndex, setImageIndex] = useState(0);
    const imageSrc = imageCandidates[imageIndex] || gameImg;

    const displayGamePage = (id) => {
        navigate(`/game/${id}`);
    };

    useEffect(() => {
        setImageIndex(0);
        setImageLoaded(false);
    }, [game.image]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        if (imageIndex < imageCandidates.length - 1) {
            setImageIndex((currentIndex) => currentIndex + 1);
            return;
        }

        setImageLoaded(true); // Stop showing skeleton after all fallbacks fail.
    };

    const prefetchGamePage = useCallback(() => {
        if (!gameId || prefetchedGameIds.has(gameId)) {
            return;
        }

        prefetchedGameIds.add(gameId);
        gameAPI.prefetchGameById(gameId);
    }, [gameId]);

    return (
        <Card
            className="game-card"
            onClick={() => gameId && displayGamePage(gameId)}
            onMouseEnter={prefetchGamePage}
            onFocus={prefetchGamePage}
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
            {!imageLoaded && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    animation="wave"
                    sx={{ backgroundColor: '#f5f5f5' }}
                />
            )}
            <CardMedia
                component="img"
                alt={game.title}
                width={320}
                height="200"
                image={imageSrc}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onLoad={handleImageLoad}
                onError={handleImageError}
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
            </CardContent>
        </Card>
    );
});

GameCard.displayName = 'GameCard';

export default GameCard;

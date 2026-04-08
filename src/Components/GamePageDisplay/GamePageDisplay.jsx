import "./GamePageDisplay.scss"
import { useMemo, useState, useEffect } from 'react';
import gameImg from "../../Assets/1784571.png";
import { getImageSourceCandidates } from '../../utils/imageSources';



function GamePageDisplay ({foundGame}) {
    const imageCandidates = useMemo(
        () => getImageSourceCandidates(foundGame?.image, gameImg),
        [foundGame?.image]
    );
    const [imageIndex, setImageIndex] = useState(0);
    const imageSrc = imageCandidates[imageIndex] || gameImg;

    useEffect(() => {
        setImageIndex(0);
    }, [foundGame?.image]);

    const handleImageError = () => {
        if (imageIndex < imageCandidates.length - 1) {
            setImageIndex((currentIndex) => currentIndex + 1);
        }
    };

    return (
        <div className="page-display">
            <img
                className="page-display-img"
                src={imageSrc}
                alt={foundGame?.title || "game_image"}
                width={640}
                height={360}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={handleImageError}
            />
            <h1 className="page-display-title">Title: {foundGame.title}</h1>
        </div>
    )
}

export default GamePageDisplay;

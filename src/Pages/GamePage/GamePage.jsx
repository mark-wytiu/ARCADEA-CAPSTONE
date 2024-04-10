import { useParams } from 'react-router-dom';
import GamePageDsiplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';


function GamePage(props) {
    const { gameId } = useParams();

    return (
        <>
            <GamePageDsiplay gameId={gameId}/>
            <GamePageDetails gameId={gameId}/>
        </>

    )
}
export default GamePage;
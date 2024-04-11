import { useParams } from 'react-router-dom';
import GamePageDsiplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import gameData from "../../Data/Allgames.json";


function GamePage() {
    const gameId = useParams();

    const foundId = Number(gameId.id)
    const foundGame = gameData.find((game) => game.id === foundId 

    )

    return (
        <div className='GamePage'>
            <GamePageDsiplay foundGame={foundGame}/>
            <GamePageDetails foundGame={foundGame}/>
        </div>

    )
}
export default GamePage;
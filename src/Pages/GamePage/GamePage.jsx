import { useParams } from 'react-router-dom';
import GamePageDsiplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import  axios  from "axios";
import { useState, useEffect } from "react";
import "./GamePage.scss"


function GamePage() {
    const gameId = useParams();

    // const foundId = Number(gameId.id)
	const baseUrl2 = process.env.REACT_APP_BASE_REACT_URL;


    const [selectedGame, setSelectedGame] = useState({});
    console.log(gameId)
    useEffect(() => {


        const gameData = async () => {
            console.log(gameId.id);
            console.log(baseUrl2);
            const response = await axios.get(`${baseUrl2}/games/${gameId.id}`);
            setSelectedGame(response.data);
        };
        gameData();

    }, []);
    

    return (
        <div className='GamePage'>
            <GamePageDsiplay foundGame={selectedGame}/>
            <GamePageDetails foundGame={selectedGame}/>
        </div>

    )
}
export default GamePage;
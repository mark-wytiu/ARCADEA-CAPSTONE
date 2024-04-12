import GameCard from "../../Components/GameCard/GameCard";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg"
import  axios  from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function HomePage() {
    const [games, setGames] = useState([]);
	
	const baseUrl2 = process.env.REACT_APP_BASE_REACT_URL;

	const { gameId } = useParams();


    useEffect(() => {
		const getGames = async () => {
			const response = await axios.get(`${baseUrl2}/games`);
			const allGames = response.data;
			setGames(allGames);
		};
		getGames();
	}, []);




    return (

        <Box sx={{
            width: '100%', backgroundImage: `url(${bgImg})`, backgroundRepeat: "no-repeat",
            backgroundSize: "cover", height: '80rem'
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{
                width:{}
                
            }}>

                <GameCard games={games}/>

            </Grid>
        </Box>
    )
}

export default HomePage;

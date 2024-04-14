import "./AddGame.scss"
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddGame() {
    const navigate = useNavigate();
    const baseUrl2 = process.env.REACT_APP_BASE_REACT_URL;
    const handleSubmit = async (event) => {
        console.log("fafsadfas")
        event.preventDefault();
        console.log(event.target)
        const form = event.target;
        console.log(form.title.value);
        const game = {
            title: form.title.value,
            genre: form.genre.value,
            releaseDate: form.releaseDate.value
        }
        console.log(game)

        try {
            const response = await axios.post(`${baseUrl2}/games`, game);
            console.log(response.data);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div class="add-game">
            <form id="add-game_form" method="post" onSubmit={handleSubmit} >
                <h3>Add Game</h3>
                <hr />
                <fieldset>
                    <input placeholder="Title" name="title" type="text" tabindex="1" required autoFocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Genre" name="genre" type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <input placeholder="Release Date" name="releaseDate" type="text" tabindex="3" required />
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" id="add-game-submit" data-submit="...Sending" >Submit</button>
                </fieldset>
            </form>
        </div>
    )
}
export default AddGame;
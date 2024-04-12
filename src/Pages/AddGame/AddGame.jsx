import "./AddGame.scss"

function AddGame() {
    return (
        <div class="add-game">
            <form id="add-game_form" action="" method="post">
                <h3>Quick Contact</h3>
                <h4>Contact us today, and get reply with in 24 hours!</h4>
                <fieldset>
                    <input placeholder="Title" type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Genre" type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <input placeholder="Platforms" type="text" tabindex="3" required />
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" id="add-game-submit" data-submit="...Sending">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AddGame;
import "./AddGame.scss"

function AddGame() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     setTitle(formData.get('title'));
    //     setGenre(formData.get('genre'));
    //     setPlatforms(formData.get('platforms'));
    //     setDescription(formData.get('description'));4
    // }

    return (
        <div class="add-game">
            <form id="add-game_form" action="" method="post" >
                <h3>Add Game</h3>
                <h4>    </h4>
                <fieldset>
                    <input placeholder="Title" name="title" type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Genre" name="genre" type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <input placeholder="Platforms" name="platorms" type="text" tabindex="3" required />
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" id="add-game-submit" data-submit="...Sending">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}
export default AddGame;
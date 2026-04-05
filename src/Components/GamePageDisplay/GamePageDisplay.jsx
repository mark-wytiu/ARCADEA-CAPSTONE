import "./GamePageDisplay.scss"



function GamePageDisplay ({foundGame}) {

    return (
        <div className="page-display">
            <img className="page-display-img" src={"../../."+foundGame.image} alt="game_image" />
            <h1 className="page-display_title">Title: {foundGame.title}</h1>
        </div>
    )
}

export default GamePageDisplay;

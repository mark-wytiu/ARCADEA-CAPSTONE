import "./GamePageDisplay.scss"



function GamePageDsiplay ({foundGame}) {

    return (
        <div className="page-display">
            <img className="page-display-img" src={"../../."+foundGame.image} alt="game image" />
            <h1 className="page-display_title">Title: {foundGame.title}</h1>
        </div>
    )
}

export default GamePageDsiplay;

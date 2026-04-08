import "./GamePageDetails.scss"

function GamePageDetails ({foundGame}) {
    return (
        <div className="page-details">
            <h3 className="page-details-genre">Genre: {foundGame.genre}</h3>
            <h3 className="page-details-platform">Platform: {foundGame.platforms}</h3>
            <h3 className="page-details-description">Description: {foundGame.description}</h3>
        </div>
    )
    

}

export default GamePageDetails;
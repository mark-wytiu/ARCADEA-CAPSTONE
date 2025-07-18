import "./GamePageDetails.scss"

function GamePageDetails ({foundGame}) {
    return (
        <div className="page-details">
            <h3 className="page-details_genre">Genre: {foundGame.genre}</h3>
            <h3 className="page-details_platform">Platform: {foundGame.platforms}</h3>
            <h3 className="page-details_desc">Description: {foundGame.description}</h3>
        </div>
    )
    

}

export default GamePageDetails;
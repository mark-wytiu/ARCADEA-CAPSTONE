import "./GamePageDetails.scss"

function GamePageDetails ({foundGame}) {
    return (
        <div className="page-details">
            <h3 className="page-details_genre">{foundGame.genre}</h3>
            <h3 className="page-details_platform">{foundGame.platforms}</h3>
            <h3 className="page-details_desc">{foundGame.description}</h3>
        </div>
    )
    

}

export default GamePageDetails;
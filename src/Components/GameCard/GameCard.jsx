function GameCard (props) {

    return( 
        <div class="game">
            <h1>Game: {props.game.name}</h1>
            <h2>Platform: {props.game.platform}</h2>
        </div>
        
    )
}
export default GameCard
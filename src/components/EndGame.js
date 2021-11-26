import './EndGame.css'

const EndGame = ({cards}) => {

    cards = cards.filter(card => card.url );

    return (
    <div className="endGame">
        <h2>Congratulations</h2>
        <p>Read more about <a href="https://reactjs.org/">React!</a></p>
        {cards.map( card => {
                return <p key={card.id}><a href={card.url} >{card.vital}</a></p>
            }
        )}
    </div>
    );
}

export default EndGame;


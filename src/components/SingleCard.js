import './SingleCard.css'

const SingleCard = ({ card }) => {
    return (
        <div className="card" >
            <div className="front">{card.part1}</div>
            <img className="back"  src="./ReactLogo3.png" alt="back of card" />
        </div>
    );
}

export default SingleCard;

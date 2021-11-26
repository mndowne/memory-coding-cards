import './SingleCard.css'


const SingleCard = ({ card , handleChoice, flipped }) => {

    const handleClick = () => {
        handleChoice(card);
    }


    return (
        <div className="card" >
            <div className={flipped ? "flipped" :"" } >
                <div className="front">{card.vital}</div>
                <img 
                    className="back"  
                    src="./ReactLogo3.png" 
                    onClick={ handleClick }
                    alt="back of card" 
                />
            </div>
        </div>
    );
}

export default SingleCard;

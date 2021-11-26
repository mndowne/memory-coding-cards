import './SingleCard.css'


const SingleCard = ({ card , handleChoice, flipped , disabled}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }


    return (
        <div className="card" >
            <div className={flipped ? "flipped" :"" } >
                <img 
                    className="front"
                    src={card.src}
                    alt="front of card"
                />
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

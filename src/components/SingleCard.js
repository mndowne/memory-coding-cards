import './SingleCard.css'


const SingleCard = ({ card , handleChoice }) => {

    const handleClick = () => {
        handleChoice(card);
    }


    return (
        <div className="card" >

            <div className="front">{card.part1}</div>
            <img 
                className="back"  
                src="./ReactLogo3.png" 
                onClick={ handleClick }
                alt="back of card" 
            />
        </div>
    );
}

export default SingleCard;

import './App.css';
import SingleCard from './components/SingleCard.js'
import { useEffect, useState } from 'react'

const cardStrings = [
    { "vital" : "Express Middleware" , matched: false},
    { "vital" : "Stateless Functional Component", matched: false  },
    { "vital" : "React Hook", matched: false },
    { "vital" : "React Component", matched: false },
    { "vital" : "react-rooter-dom", matched: false },
    { "vital" : "JSON", matched: false },
    { "vital" : "Express Middleware" , matched: false},
    { "vital" : "Stateless Functional Component", matched: false  },
    { "vital" : "React Hook", matched: false },
    { "vital" : "React Component", matched: false },
    { "vital" : "react-rooter-dom", matched: false },
    { "vital" : "JSON", matched: false }
]


function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardStrings ]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }));

            setCards(shuffledCards);
            setTurns(0);
    }

    //handle a choice
    const handleChoice = (card, prevSelections) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card) ;
    }

    // reset choices and increse turn
    const resetTurn = (prevTurns) => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns = prevTurns + 1);
    }
   
    // evaluate the two card choices
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.vital === choiceTwo.vital )
            {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.vital === choiceOne.vital){
                            return {...card, matched:true}
                        } 
                        else {
                            return card
                        }
                    })
                })
                resetTurn();
            }
            else 
            {
                setTimeout( () => resetTurn() , 1000);
            }
        }
    }, [choiceTwo, choiceOne ])
    
    
  return (
    <div className="App">
        <h1>Coding Cards</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
            {cards.map(card=> (
        <SingleCard 
             key={card.id} 
             card={card}
             handleChoice={handleChoice}
             flipped={card === choiceOne || card === choiceTwo || card.matched}
         />
            ))
            }
        </div>
    </div>
  );
}

export default App

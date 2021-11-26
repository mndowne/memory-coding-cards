import './App.css';
import SingleCard from './components/SingleCard.js'
import { useEffect, useState } from 'react'

const cardStrings = [
    { "vital" : "Component LifeCylcle" ,src : "/img/ComponentLifeCycleVital.png" , matched: false},
    { "vital" : "Functional Component",src : "/img/FunctionalComponentVital.png" , matched: false  },
    { "vital" : "React Hook",src : "/img/ReactHookVital.png" , matched: false },
    { "vital" : "Impure Function",src : "/img/ImpureFunctionVital.png" , matched: false },
    { "vital" : "react-rooter-dom",src : "/img/ReactRouterDomVital.png" , matched: false },
    { "vital" : "Conditional Rendering",src : "/img/ConditionalRenderingVital.png" , matched: false },
    { "vital" : "Component LifeCylcle" ,src : "/img/ComponentLifeCycle.png" , matched: false},
    { "vital" : "Functional Component",src : "/img/FunctionalComponent.png" , matched: false  },
    { "vital" : "React Hook",src : "/img/ReactHook.png" , matched: false },
    { "vital" : "Impure Function",src : "/img/ImpureFunction.png" , matched: false },
    { "vital" : "react-rooter-dom",src : "/img/ReactRouterDom.png" , matched: false },
    { "vital" : "Conditional Rendering",src : "/img/ConditionalRendering.png" , matched: false }
]


function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardStrings ]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }));

            setChoiceOne(null);
            setChoiceTwo(null);
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
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }


    // Start game automatically 
    useEffect(() => {
        shuffleCards();
    }, [])
   
    // evaluate the two card choices
    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true);

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
                 disabled={disabled}
             />
            ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App

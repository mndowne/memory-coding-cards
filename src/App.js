import './App.css';
import SingleCard from './components/SingleCard.js'
import { useEffect, useState } from 'react'
import EndGame from './components/EndGame.js'

const cardStrings = [
    { "vital" : "Component LifeCylcle" ,src : "/img/ComponentLifeCycleVital.png" , matched: false, url : "https://reactjs.org/docs/state-and-lifecycle.html#gatsby-focus-wrapper"},
    { "vital" : "Functional Component",src : "/img/FunctionalComponentVital.png" , matched: false  , url : "https://reactjs.org/docs/hooks-state.html#hooks-and-function-components"},
    { "vital" : "React Hook",src : "/img/ReactHookVital.png" , matched: false , url : "https://reactjs.org/docs/hooks-rules.html#gatsby-focus-wrapper"},
    { "vital" : "Impure Function",src : "/img/ImpureFunctionVital.png" , matched: false , url : "https://reactjs.org/docs/components-and-props.html#props-are-read-only"},
    { "vital" : "react-rooter-dom",src : "/img/ReactRouterDomVital.png" , matched: false , url : "https://v5.reactrouter.com/web/guides/quick-start"},
    { "vital" : "Conditional Rendering",src : "/img/ConditionalRenderingVital.png" , matched: false , url : "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper"},
    { "vital" : "Component LifeCylcle" ,src : "/img/ComponentLifeCycle.png" , matched: false, url : null },
    { "vital" : "Functional Component",src : "/img/FunctionalComponent.png" , matched: false  , url : null },
    { "vital" : "React Hook",src : "/img/ReactHook.png" , matched: false , url : null },
    { "vital" : "Impure Function",src : "/img/ImpureFunction.png" , matched: false , url : null },
    { "vital" : "react-rooter-dom",src : "/img/ReactRouterDom.png" , matched: false , url : null },
    { "vital" : "Conditional Rendering",src : "/img/ConditionalRendering.png" , matched: false , url : null }
]


function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [completion, setCompletion] = useState(false);

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
    
    // check if the game has completed
    useEffect(() => {
        for (let i = 0; i < cards.length ; i++){
            if (cards[i].matched === false)
            {
                setCompletion(false);
                break;
            }
            setCompletion(true);
        }
    }, [ cards ,turns ] )
    
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
        {completion && <EndGame cards={cards}/>}
    </div>
  );
}

export default App

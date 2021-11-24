import './App.css';
import { useState } from 'react'

const cardStrings = [
    { "part1" : "Express Middleware" },
    { "part1" : "Stateless Functional Component" },
    { "part1" : "React Hook" },
    { "part1" : "React Component" },
    { "part1" : "react-rooter-dom" },
    { "part1" : "JSON" }

]

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState([]);

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardStrings , ...cardStrings ]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }));

            setCards(shuffledCards);
            setTurns(0);
    }

    console.log(cards,turns);
    

  return (
    <div className="App">
        <h1>Coding Cards</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
            {cards.map(card=> (
                <div className="card" key={card.id}>
                <div className="front">{card.part1}</div>
                <div className="back"></div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default App;

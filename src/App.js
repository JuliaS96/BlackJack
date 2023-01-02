import { useEffect, useState } from 'react';
import './App.css';
import { SingleCard } from './components/SingleCard.js'


const cardImages = [
  {"src": "/img/ace_of_clubs.png", value: 1, coat: "clubs"},
  {"src": "/img/2_of_clubs.png", value: 2, coat: "clubs"},
  {"src": "/img/3_of_clubs.png", value: 3, coat: "clubs"},
  {"src": "/img/4_of_clubs.png", value: 4, coat: "clubs"},
  {"src": "/img/5_of_clubs.png", value: 5, coat: "clubs"},
  {"src": "/img/6_of_clubs.png", value: 6, coat: "clubs"},
  {"src": "/img/7_of_clubs.png", value: 7, coat: "clubs"},
  {"src": "/img/8_of_clubs.png", value: 8, coat: "clubs"},
  {"src": "/img/9_of_clubs.png", value: 9, coat: "clubs"},
  {"src": "/img/10_of_clubs.png", value: 10, coat: "clubs"},
  {"src": "/img/jack_of_clubs2.png", value: 11, coat: "clubs"},
  {"src": "/img/queen_of_clubs2.png", value: 12, coat: "clubs"},
  {"src": "/img/king_of_clubs2.png", value: 13, coat: "clubs"},
  {"src": "/img/ace_of_hearts.png", value: 1, coat: "hearts"},
  {"src": "/img/2_of_hearts.png", value: 2, coat: "hearts"},
  {"src": "/img/3_of_hearts.png", value: 3, coat: "hearts"},
  {"src": "/img/4_of_hearts.png", value: 4, coat: "hearts"},
  {"src": "/img/5_of_hearts.png", value: 5, coat: "hearts"},
  {"src": "/img/6_of_hearts.png", value: 6, coat: "hearts"},
  {"src": "/img/7_of_hearts.png", value: 7, coat: "hearts"},
  {"src": "/img/8_of_hearts.png", value: 8, coat: "hearts"},
  {"src": "/img/9_of_hearts.png", value: 9, coat: "hearts"},
  {"src": "/img/10_of_hearts.png", value: 10, coat: "hearts"},
  {"src": "/img/jack_of_hearts2.png", value: 11, coat: "hearts"},
  {"src": "/img/queen_of_hearts2.png", value: 12, coat: "hearts"},
  {"src": "/img/king_of_hearts2.png", value: 13, coat: "hearts"},
  {"src": "/img/ace_of_diamonds.png", value: 1, coat: "diamonds"},
  {"src": "/img/2_of_diamonds.png", value: 2, coat: "diamonds"},
  {"src": "/img/3_of_diamonds.png", value: 3, coat: "diamonds"},
  {"src": "/img/4_of_diamonds.png", value: 4, coat: "diamonds"},
  {"src": "/img/5_of_diamonds.png", value: 5, coat: "diamonds"},
  {"src": "/img/6_of_diamonds.png", value: 6, coat: "diamonds"},
  {"src": "/img/7_of_diamonds.png", value: 7, coat: "diamonds"},
  {"src": "/img/8_of_diamonds.png", value: 8, coat: "diamonds"},
  {"src": "/img/9_of_diamonds.png", value: 9, coat: "diamonds"},
  {"src": "/img/10_of_diamonds.png", value: 10, coat: "diamonds"},
  {"src": "/img/jack_of_diamonds.png", value: 11, coat: "diamonds"},
  {"src": "/img/queen_of_diamonds.png", value: 12, coat: "diamonds"},
  {"src": "/img/king_of_diamonds.png", value: 13, coat: "diamonds"},
  {"src": "/img/ace_of_spades.png", value: 1, coat: "spades"},
  {"src": "/img/2_of_spades.png", value: 2, coat: "spades"},
  {"src": "/img/3_of_spades.png", value: 3, coat: "spades"},
  {"src": "/img/4_of_spades.png", value: 4, coat: "spades"},
  {"src": "/img/5_of_spades.png", value: 5, coat: "spades"},
  {"src": "/img/6_of_spades.png", value: 6, coat: "spades"},
  {"src": "/img/7_of_spades.png", value: 7, coat: "spades"},
  {"src": "/img/8_of_spades.png", value: 8, coat: "spades"},
  {"src": "/img/9_of_spades.png", value: 9, coat: "spades"},
  {"src": "/img/10_of_spades.png", value: 10, coat: "spades"},
  {"src": "/img/jack_of_spades2.png", value: 11, coat: "spades"},
  {"src": "/img/queen_of_spades2.png", value: 12, coat: "spades"},
  {"src": "/img/king_of_spades2.png", value: 13, coat: "spades"},

]

function App() {
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  
  // shuffle cards
const shuffleCards = () => {
   let shuffledCards = [...cardImages]
    for(let i = 0; i < 52; i++){
      let rand  = Math.round(Math.random()*52)

      let tempCard = shuffledCards[rand]
      shuffledCards[rand] = shuffledCards[i]
      shuffledCards[i] = tempCard

     }

    setCards(shuffledCards)
    console.log(shuffledCards)
    setTurns(0)
}


  const handleChoice = (card) => {

  }

  useEffect(() => {
    shuffleCards()
  },[])

  const resetTurn = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='game-title'>BlackJack</div>
        <button onClick={shuffleCards}>New Game</button>

        <div className='card-grid'>
          {cards.map(card => (
            <SingleCard 
              key={card.src}
              card={card}
              handleChoice={handleChoice}/>
          ))}
        </div>
      </header>
      <div className='score'>Points: {turns}</div>
    </div>
  ); 
}

export default App;

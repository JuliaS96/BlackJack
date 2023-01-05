import { useEffect, useState } from 'react';
import './App.css';
import { PlayingField } from './components/PlayingField';


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
  {"src": "/img/jack_of_clubs2.png", value: 10, coat: "clubs"},
  {"src": "/img/queen_of_clubs2.png", value: 10, coat: "clubs"},
  {"src": "/img/king_of_clubs2.png", value: 10, coat: "clubs"},
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
  {"src": "/img/jack_of_hearts2.png", value: 10, coat: "hearts"},
  {"src": "/img/queen_of_hearts2.png", value: 10, coat: "hearts"},
  {"src": "/img/king_of_hearts2.png", value: 10, coat: "hearts"},
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
  {"src": "/img/jack_of_diamonds2.png", value: 10, coat: "diamonds"},
  {"src": "/img/queen_of_diamonds2.png", value: 10, coat: "diamonds"},
  {"src": "/img/king_of_diamonds2.png", value: 10, coat: "diamonds"},
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
  {"src": "/img/jack_of_spades2.png", value: 10, coat: "spades"},
  {"src": "/img/queen_of_spades2.png", value: 10, coat: "spades"},
  {"src": "/img/king_of_spades2.png", value: 10, coat: "spades"},

]

function App() {
  const [bank, setBank] = useState(1000)
  const [cards, setCards] = useState([])
  const [bet, setBet] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loser, setLoser] = useState(false)
  const [turn, setTurn] = useState(0)
  
  // shuffle cards
const shuffleCards = (bankAmt) => {
   let shuffledCards = [...cardImages]
    for(let i = 0; i < 52; i++){ 
      let rand  = Math.round(Math.random()*52)
      let tempCard = shuffledCards[rand]
      shuffledCards[rand] = shuffledCards[i]
      shuffledCards[i] = tempCard

     }
    setPlaying(false)
    setCards(shuffledCards)
    setBank(bankAmt)
    setBet(0)
    setLoser(false)
    setTurn(0)
}

useEffect(() => {
  if(bank < 1 ){
    setLoser(true)
  }
}, [bank])

useEffect(() => {
  setTurn(prev => prev+1)
  let shuffledCards = [...cardImages]
  for(let i = 0; i < 52; i++){ 
    let rand  = Math.round(Math.random()*52)
    let tempCard = shuffledCards[rand]
    shuffledCards[rand] = shuffledCards[i]
    shuffledCards[i] = tempCard
   }
   setCards(shuffledCards)
}, [playing])

  useEffect(() => {
    shuffleCards(1000)
  },[])


  const handleStart = () => {
    if(bet > 0) {
      setPlaying(true)
    } 
  }

  return (
    <div className="App">
      <div></div>
      <header className="App-header">
        <div className='game-title'>BlackJack
        </div>
        {!playing && !loser && <div className='card-grid'>
          Place Bet:
        <div className='bets'>
          <button className='chip' onClick={() => {setBet(prevBet => Math.min(prevBet + 1, bank))}}>1</button>
          <button className='chip' onClick={() => {setBet(prevBet => Math.min(prevBet + 5, bank))}}>5</button>
          <button className='chip' onClick={() => {setBet(prevBet => Math.min(prevBet + 25, bank))}}>25</button>
          <button className='chip' onClick={() => {setBet(prevBet => Math.min(prevBet + 50, bank))}}>50</button>
          <button className='chip' onClick={() => {setBet(prevBet => Math.min(prevBet + 100, bank))}}>100</button>
        </div>
          <button 
            className='bet-butts'
            onClick={() => {setBet(0)}}
            >Clear</button>Bet: ${bet} 
          <button 
            className='bet-butts'
            onClick={() => {setBet(bank)}}>All in</button>
          <br/>
          <button className={bet>0 ? 'start' : 'start-active'} onClick={handleStart}>{bet > 0 ? "Deal" : "Set Bet"}</button>
        </div>}
        {!loser && playing && <div>
          <PlayingField 
            cards={cards} 
            bank={bank}
            setBank={setBank}
            setPlaying={setPlaying}
            bet={bet}/>
          </div>}
          {loser && 
            <div className='loser'>
              <h1 className='finished-field' >House Wins!</h1>
              
              Please press <h2 className='dealer-won' onClick={() => (shuffleCards(1000))}>New Game </h2>to try again :) 
            </div>}
        <div className='score'>Bank: <p className='currency'>{bank.toLocaleString('en')}</p></div>
      </header>
      <div className='right-div'>
      <button 
          className="start-button" 
          onClick={() => {shuffleCards(1000)}}>New Game</button>
          {playing && <div>Bet: <p className='currency'>{bet.toLocaleString('en')}</p></div>}

      </div>

    </div>
  ); 
}

export default App;

import { useEffect, useState } from 'react'
import './PlayingField.css'
import { SingleCard } from './SingleCard.js'
import { Mutex } from 'async-mutex'

export function PlayingField({cards, bank, setBank, bet, setPlaying}) {
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [currentCard, setCurrentCard] = useState(0)
  const [flippedDealer, setFlippedDealer] = useState(false)
  const [first, setFirst] = useState(true)
  const [finishedGame, setFinishedGame] = useState(false)
  const [winMessage, setWinMessage] = useState('')
  const [winner, setWinner] = useState(false)
  const [dealerDone, setDealerDone] = useState(false)
  const [dealerRunning, setDealerRunning] = useState(false)
  const mutex = new Mutex()


  const deal = (num) => {
      const newPlayerCards = [...playerCards, cards[num]]
      setPlayerCards(newPlayerCards) 
      setCurrentCard(prev => prev + 1)

  }

  const dealDealer = (num) => {
    if(dealerScore < 17 && playerScore < 22){
      const newDealerCards = [...dealerCards, cards[num]]
      console.log("dealing", num)
      setDealerCards(newDealerCards)
      setCurrentCard(prev => prev + 1)
    } 
  }

  useEffect(() => {
      dealDealer(currentCard+1)
      setTimeout(() => {
      deal(currentCard)
      setFirst(false)
    }, 400)

  }, [first])

  useEffect(() => {
    if(!dealerDone){
      calcDealerScore()
      calcPlayerScore()
    }
  }, [playerCards, dealerCards, flippedDealer])

  const handleStand = () => {
    setFlippedDealer(true)
    setFinishedGame(true)
  }

  const dealerScoreFunc = (card, index) => {
    if (flippedDealer === true || index !== 0){
      return card.value
    } 
    return 0
  }

  useEffect(() => {
    if(!finishedGame) {
      if(playerScore > 21 || dealerScore > 21){
        setFinishedGame(true)
        setFlippedDealer(true)
      }
     }
    }, [playerScore, dealerScore])


  async function dealerRun() {
    const release = await mutex.acquire() // acquires access to the critical path
    try {
      if(flippedDealer){
        console.log("before: ", dealerScore)
        if(!dealerDone && dealerScore < 18 && playerScore < 22){
        dealDealer(currentCard)
        dealerRunning(prev => !prev)
      } else {
        setDealerDone(true)
      }}
    } finally {
      release() 
    }
  }

  useEffect(()=>{
    if(flippedDealer){
      setDealerRunning(prev => !prev)
    } 
  }, [dealerScore])


  useEffect(()=> {
    dealerDone ? setWinner(true) : setWinner(winner)
  },[dealerDone, winner])

  useEffect(() => {
    if(finishedGame && playerScore < 22 && !dealerDone){
      dealerRun()
    } else if (finishedGame){
      setDealerDone(true)
    }
  }, [finishedGame, playerScore, dealerRunning])

  useEffect(() => {
    if(dealerDone){
      if(dealerScore > 21){
        if(playerScore === 21){
          setWinMessage('BlackJack! You win!')
          setTimeout(() => setBank(bank + Math.round(1.5*bet)), 1000)
        } else {
          setWinMessage('You win!')
          setTimeout(() => setBank(bank + bet), 1000)
        }
        setTimeout(() => setPlaying(false), 4000)
      } else if (playerScore > 21) {
        setWinMessage('Dealer wins!')
        setTimeout(()=> setBank(bank- bet),1000)
        setTimeout(() => setPlaying(false), 4000)
      } else if (playerScore === dealerScore){
        setWinMessage('Push!')
        setTimeout(()=> setBank(bank ),1000)
        setTimeout(() => setPlaying(false), 4000)
      } else if (playerScore > dealerScore) {
        if(playerScore === 21){
          setWinMessage('BlackJack! You win!')
          setTimeout(() => setBank(bank + Math.round(1.5*bet)), 1000)
        } else {
          setWinMessage('You win!')
          setTimeout(() => setBank(bank + bet), 1000)
        }
        setTimeout(() => setPlaying(false), 4000)
      } else {
        setWinMessage('Dealer wins!')
        setTimeout(()=> setBank(bank - bet),1000)
        setTimeout(() => setPlaying(false), 4000)
      }
    
    }

  } , [winner])

  const dealerScoreAceFunc = (card, index, firstAce) => {
    if (flippedDealer === true || index !== 0){
      if(firstAce && card.value === 1){
        return 11
      } else{
        return card.value
      }
    } else {
      return 0
    }

  }

  const calcDealerScore = () => {
    let score = 0
    let scoreAce = 0;
    let firstAce = true;
    dealerCards.forEach((card,index) => (
      score += dealerScoreFunc(card, index)
    ))

    dealerCards.forEach((card, index) => {
      scoreAce += dealerScoreAceFunc(card, index, firstAce)
      if(firstAce === true && card.value === 1){
        firstAce = false
      }
    })

    if (scoreAce > score && scoreAce <= 21){
      setDealerScore(scoreAce)
      return scoreAce
    } else {
      setDealerScore(score)
      return score
    }
    

  }

  const calcPlayerScore = () => {
    let score = 0
    let firstAce = true
    let scoreAce = 0;
    playerCards.forEach((card,index) => (
      score += dealerScoreFunc(card, index+1)
     ))

    playerCards.forEach((card, index) => {
      scoreAce += dealerScoreAceFunc(card, index+1, firstAce)
      if(firstAce === true && card.value === 1){
        firstAce = false
      }
    })

    if (scoreAce > score && scoreAce < 22){
      setPlayerScore(scoreAce)
    } else {
      setPlayerScore(score)
    }
  }

  const handleHit = () => {
    if(!finishedGame){
      deal(currentCard)
    }
  }

  return (
    <div className='card-grid'>
      <div className='playing-field'>
      <div className='right-box'>
          <div className='dealer-score'></div>
          <button className='field-button' onClick={handleHit}>Hit</button>
          <div className='player-score'></div>
        </div>
        <div className='cards-field'>
          <div className='dealer'>{dealerCards.map((card,index) => (
              <SingleCard 
                key={card.src} 
                card={card}
                flipped={!(index === 0)||flippedDealer}
                index={index}
                />
            ))}</div>
          <div> {finishedGame && <div className='finished-field'>{winMessage}</div>}</div>
          <div className='player'>
            {playerCards.map((card , index) => (
              <SingleCard 
                key={card.src} 
                card={card}
                flipped={true}
                index={index}
                />
            ))}
          </div>
        </div>
        <div className='right-box'>
          <div className='dealer-score'>Dealer: {dealerScore}</div>
          <button className='field-button' onClick={handleStand}>Stand</button>
          <div className='player-score'>Player: {playerScore}</div>
        </div>

      </div>
  </div>
  )
}
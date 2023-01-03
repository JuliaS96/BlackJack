import { useEffect, useState } from 'react'
import './PlayingField.css'
import { SingleCard } from './SingleCard.js'

export function PlayingField({cards, playerScoreO, dealerScoreO}) {
  const [playerScore, setPlayerScore] = useState(playerScoreO)
  const [dealerScore, setDealerScore] = useState(dealerScoreO)
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [currentCard, setCurrentCard] = useState(0)
  const [flippedDealer, setFlippedDealer] = useState(false)
  const [first, setFirst] = useState(true)


  const deal = (num) => {
    const newPlayerCards = [...playerCards, cards[num]]
    const newDealerCards = [...dealerCards, cards[num+1]]
    setPlayerCards(newPlayerCards) 
    setDealerCards(newDealerCards)
    console.log(playerCards)
  }
  useEffect(() => {
   deal(currentCard)
   setFirst(false)
   setCurrentCard(prev => prev + 2)
  }, [first])

  useEffect(() => {
    setCurrentCard(prev => prev + 2)
    calcDealerScore()
    calcPlayerScore()
  }, [playerCards, dealerCards, flippedDealer])

  const handleStand = () => {
    setFlippedDealer(true)
  }

  const dealerScoreFunc = (card, index) => {
    if (flippedDealer === true || index !== 0){
      return card.value
    } 
    return 0
    
    
  }

  const dealerScoreAceFunc = (card, index, firstAce) => {
    if (flippedDealer === true || index !== 0){
      if(firstAce){
        return 11
      }
      return card.value
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
    } else {
      setDealerScore(score)
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


  return (
    <div className='card-grid'>
      <div className='playing-field'>
        <button className='field-button' onClick={()=>deal(currentCard)}>Hit</button>
        <div className='cards-field'>
          <div className='dealer'>{dealerCards.map((card,index) => (
              <SingleCard 
                key={card.src} 
                card={card}
                flipped={!(card.src === cards[1].src)||flippedDealer}
                index={index}
                />
            ))}</div>
          <div></div>
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
import './SingleCard.css'

export function SingleCard({card, handleChoice, flipped}) {
  const handleClick = () => {

    }

  return (
  <div className='card'>
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="card front"/>
      <img 
        className="back" 
        src="/img/backblue.png" 
        onClick={handleClick} 
        alt="card back"/>
    </div>
  </div>
  )
}
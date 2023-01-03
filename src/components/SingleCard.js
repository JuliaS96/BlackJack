import './SingleCard.css'

export function SingleCard({card, flipped, index}) {

  return (
  <div className='card'>
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="card front"/>
      <img 
        className="back" 
        src="/img/backblue.png" 
        alt="card back"/>
    </div>
  </div>

  )
}
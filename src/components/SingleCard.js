import './SingleCard.css'

export function SingleCard({card, flipped, index, num}) {
  num = 5
  return (
  <div className='card'>
    <div className={flipped ? "flipped" : ""}>
      <img src={card.src} alt="card front" className={num < 6 ? "front-fixed" : "front-var"}/>
      <img 
        className={num < 6 ? "back-fixed" : "back-var"} 
        src="/img/backblue.png" 
        alt="card back"/>
    </div>
  </div>

  )
}
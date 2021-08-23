import './card-front.css'
import '../card-common.css'

const CardFront = ({cardNumber}) => {
    return (
        <div className="card-template card-spade card-front">
            <div>
                <div className="card-rank">{cardNumber}</div>
                <div className="spade-icon">♠</div>
            </div>
            <div className="spade-center">♠</div>
            <div>
                <div className="spade-icon reversed-icon">♠</div>
                <div className="card-rank reversed-icon">{cardNumber}</div>
            </div>
        </div>
    );
}
 
export default CardFront;
import React, { useContext, useState } from 'react';
import CardBack from './card-templates/card-back/CardBack';
import CardFront from './card-templates/card-front/CardFront';
import { DeckContext } from '../../context/DeckContext';
import { cardSeries } from '../../utils/CardSeries';
import './card.css'

const Card = ({cardNumber, cardUnitNumber, cardDeck, isCardReverse}) => {

    const deckContextValue = useContext(DeckContext);
    const [gameCards,] = deckContextValue.gameCards;

    const [mousePositionX, setMousePositionX] = useState(0);
    const [mousePositionY, setMousePositionY] = useState(0);
    var xAxisDifference;
    var yAxisDifference;

    const dragStart = (event) => {

        if(event.target.className === 'card') {
            // Setdata parameter ************//
            let cardNumber = event.target.id.split("-")[0];
            let cardDeckNumber = +event.target.id.split("-")[4];
            let cardUnitIndex = event.target.id.split("-")[2] - 1;
            let cardsInTheUnit = gameCards[cardUnitIndex];

            // Find the index of card in current unit
            var unitIndexOfCard;
            
            gameCards[cardUnitIndex].forEach((card, index) => {
                if(card.cardNum === cardNumber && card.cardDeck === cardDeckNumber) {
                    unitIndexOfCard = index;
                }
            })

            // Set the data to be sent with dataTransfer.setData
            var sendData = [];
            var lastNumber;

            // Loop to get movable cards by comparing them each other until the end of unit
            for(let i = unitIndexOfCard; i < cardsInTheUnit.length; i++) {
                let cardNumValue = cardsInTheUnit[i].cardNum;
                if(sendData.length === 0) {
                    sendData.push(event.target.id);
                    lastNumber = cardNumValue;
                } else {
                    if(cardSeries.indexOf(lastNumber) === cardSeries.indexOf(cardNumValue) - 1 && !isCardReverse) {
                        sendData.push(`${cardsInTheUnit[i].cardNum}-spare-${cardUnitIndex + 1}-deck-${cardsInTheUnit[i].cardDeck}`);
                        lastNumber = cardNumValue;
                    } else {
                        sendData = [];
                        break;
                    }
                }
            }

            // Send if informations of movable cards
            event.dataTransfer.setData("Text", sendData);
            event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);

            // Add selected__card classname to movable cards
            for(let i = 0; i < sendData.length; i++) {
                document.getElementById(sendData[i]).children[0].classList.add("selected__card");
            }

            setMousePositionX(event.pageX);
            setMousePositionY(event.pageY);
        }
    }

    const drag = (event) => {
        const selectedCards = document.querySelectorAll(".selected__card");
        xAxisDifference = event.pageX - mousePositionX;
        yAxisDifference = event.pageY - mousePositionY;
        // Drag card elements by axis difference
        var css = "z-index:9999; pointer-events: none; transform: translate(" + xAxisDifference + "px, " +
        yAxisDifference + "px)";
        selectedCards.forEach(element => {
            element.style.cssText = css;
        })
    }

    const dropEnd = () => {
        // Bring the card elements to initial state when drop end
        var css = "z-index:0; pointer-events:auto; transform:translate(0,0);";
        document.querySelectorAll(".selected__card").forEach((element) => {
            element.classList.remove("selected__card");
            element.style.cssText = css;
        });
    }

    return (
        <div id={`${cardNumber}-spare-${cardUnitNumber}-deck-${cardDeck}`}
        className="card"
        onDragStart={(event) => dragStart(event)}
        onDrag={(event) => drag(event)}
        onDragEnd={() => dropEnd()}
        draggable>
            {isCardReverse && <CardBack/>}
            {!isCardReverse && <CardFront cardNumber={cardNumber} />}
        </div>
    );
}

export default React.memo(Card);
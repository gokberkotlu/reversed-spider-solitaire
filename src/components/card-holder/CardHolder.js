import React, { useContext, useEffect } from 'react';
import Card from '../card/Card';
import EmptyCardBox from '../empty-card-box/EmptyCardBox';
import { DeckContext } from '../../context/DeckContext';
import { DashboardContext } from '../../context/DashboardContext';
import { cardSeries } from '../../utils/CardSeries';
import './card-holder.css';

const CardHolder = ({cards, cardUnitNumber}) => {

    // DeckContext
    const deckContextValue = useContext(DeckContext);

    const [gameCards, setGameCards] = deckContextValue.gameCards;
    const [numberOfCompleted, setNumberOfCompleted] = deckContextValue.numberOfCompleted;
    const [isGameStarted, setIsGameStarted] = deckContextValue.isGameStarted;
    const logGameChanges = deckContextValue.logGameChanges;
    const [score, setScore] = deckContextValue.score;
    const [highScore, setHighScore] = deckContextValue.highScore;

    // DashboardContext
    const dashboardContextValue = useContext(DashboardContext);
    
    const [, setIsGameFinished] = dashboardContextValue.isGameFinished;


    const allowDrop = (event) => {
        event.preventDefault();
    }

    const addSelectedCards = (ids, prevCards, beforeUnitIndex, currentUnitIndex) => {
        // Push selected cards to prevCard state in valid unit
        for(let i = 0; i < ids.length; i++) {
            let movingCardNumber = ids[i].split("-")[0];
            let deckNumberOfMovingCard = +ids[i].split("-")[4];
            prevCards[beforeUnitIndex].map((card, index) => {
                // Prevent this stages if card is droping to same unit
                if(card.cardNum === movingCardNumber && card.cardDeck === deckNumberOfMovingCard) {
                    var movingCard = prevCards[beforeUnitIndex][index];
                    // Delete replaced cards from before unit
                    prevCards[beforeUnitIndex].splice(index, 1);
                    // Add selected cards to new unit
                    prevCards[currentUnitIndex].push(movingCard);
                }
                return prevCards;
            });
        }
        setGameCards(prevCards);
    }
    
    const drop = (event) => {

        // Save Changes Made by Drop Event
        logGameChanges();

        // set game cards with getData
        var data = event.dataTransfer.getData("Text");
        // If there are movable cards
        if(data.length !== 0) {
            var currentUnitIndex = cardUnitNumber - 1;
            var ids = data.split(",");
            var firstCardDragging = ids[0].split("-")[0];
            var beforeUnitIndex = +ids[0].split("-")[2] - 1;
            // If card unit is changing for the valid card/cards
            if(currentUnitIndex !== beforeUnitIndex) {

                var prevCards = [...gameCards];
                // Get the last card's number in current unit and check if suitable
                // Also check if the current unit has any cards
                let currentUnit = [...prevCards[currentUnitIndex]];
                if(currentUnit.length !== 0) {
                    let lastCardBeforeDrop = currentUnit.slice(-1)[0].cardNum;
                    if(cardSeries.indexOf(lastCardBeforeDrop) === cardSeries.indexOf(firstCardDragging) - 1) {
                        addSelectedCards(ids, prevCards, beforeUnitIndex, currentUnitIndex);
                        // Start timer when first 10 card pack added
                        if(!isGameStarted) {
                            setIsGameStarted(true);
                        }
                        // Decrease score with one when a move realized
                        setScore(prevScore => prevScore - 1);
                    }
                } else {
                    addSelectedCards(ids, prevCards, beforeUnitIndex, currentUnitIndex)
                }
            }
        }
    }

    const openLastCardIfReversed = () => {
        // This query turns the card if it's the last reversed card of its unit
        if(cards.length !== 0 && cards[cards.length - 1].isCardReverse) {
            let cloneGameCards = [...gameCards];
            cloneGameCards[cardUnitNumber - 1][cards.length - 1].isCardReverse = false;
            setGameCards(cloneGameCards);
        }
    }

    const isSeriesCompleted = async () => {
        if(cards.length >= 13 && cards.slice(-1)[0].cardNum === 'K') {
            let lastCardIndex = cards.length - 1;
            let compareRepeat = 0;
            // Limiter : 12 -> To get first card of series by (index - 1)
            for(let i = lastCardIndex; i > lastCardIndex - 12; i--) {
                if((cardSeries.indexOf(cards[i].cardNum) === cardSeries.indexOf(cards[i - 1].cardNum) + 1)
                    &&
                    !cards[i - 1].isCardReverse
                ) {
                    compareRepeat += 1; // Keep data of how many comparing steps are done
                    if(compareRepeat === 12) {

                        let cloneCards = [...cards];
                        let cloneGameCards = [...gameCards];

                        cloneCards.splice(i - 1,); // Delete the complete series from gameCards
                        cloneGameCards[cardUnitNumber - 1] = cloneCards;
                        await setGameCards(cloneGameCards);

                        setNumberOfCompleted(Array(numberOfCompleted.length + 1)); // Increase completed desk blocks

                        // Check if game finished
                        if(numberOfCompleted.length + 1 === 8) { // 8 stands for completed decks
                            setIsGameFinished(true); // Get the pop-up with this dependency
                            setIsGameStarted(false); // Stop the timer which is bounded to this dependency when game is completed
                        }

                        // Score states setting
                        let updatedScore = score + 100; // Update score to set state of score and highScore

                        setScore(updatedScore); // Increase score, if a series completed
                        if(updatedScore > highScore) { // Update highScore if there is new
                            localStorage.setItem('highScore', updatedScore);
                            setHighScore(updatedScore);
                        }
                    }
                } else {
                    break;
                } // if statement
            } // for statement
        } // if statement
    } // isSeriesCompleted

    useEffect(() => {
        isSeriesCompleted(); // Check if a card series
        openLastCardIfReversed(); // Check if last card is reversed in it's unit
    }, [gameCards])

    return (
        <div
        className="card-holder-unit"
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}>
            <EmptyCardBox />
            {/* cards variable contains the cards inside card unit(including column) */}
            {cards.map((card) => (
                <Card
                cardNumber={card.cardNum}
                cardUnitNumber={cardUnitNumber}
                cardDeck={card.cardDeck}
                isCardReverse={card.isCardReverse}
                key={'rank-' + card.cardNum + '-deck-' + card.cardDeck}/>
            ))}
        </div>
    );
}

export default React.memo(CardHolder);
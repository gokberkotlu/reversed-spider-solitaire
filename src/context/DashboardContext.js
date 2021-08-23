import React, { useState, createContext, useContext, useEffect } from "react";
import { DeckContext } from "./DeckContext";

export const DashboardContext = createContext();

export const DashboardProvider = props => {

    // States
    const [counter, setCounter] = useState("00:00:00"); // Represents timer
    const [isGameFinished, setIsGameFinished] = useState(false); // According to this state, popup is shown or not
    const [resetBit, setResetBit] = useState(false); // It triggers the useEffect to reset the game
    const [decreaseInEveryTenSeconds, setDecreaseInEveryTenSeconds] = useState(0); // Decrease 2 points from score for each 10 sec

    // DeckContext
    const deckContextValue = useContext(DeckContext);

    const [, setGameCards] = deckContextValue.gameCards;
    const [, setRemainingCards] = deckContextValue.remainingCards;
    const [, setNumberOfCompleted] = deckContextValue.numberOfCompleted;
    const [, setNewCardPacks] = deckContextValue.newCardPacks;
    const [, setIsGameStarted] = deckContextValue.isGameStarted;
    const [, setStatesLog] = deckContextValue.statesLog;
    const suffleTheCards = deckContextValue.suffleTheCards;
    const dealTheCards = deckContextValue.dealTheCards;
    const arrangeReversedCards = deckContextValue.arrangeReversedCards;

    const [, setScore] = deckContextValue.score;

    const resetGame = () => {
        // Resetting
        setGameCards([[],[],[],[],[],[],[],[],[],[]]);
        setRemainingCards([]);
        setNewCardPacks(Array(5));
        setNumberOfCompleted(Array(0));
        setScore(500);
        setCounter("00:00:00");
        setIsGameFinished(false);
        setResetBit(true);
        setIsGameStarted(false);
        setStatesLog([]);
        setDecreaseInEveryTenSeconds(0);
    }

    useEffect(() => {// Deal cards again from scratch
        if(resetBit) {
            var allCards = suffleTheCards();
            var gameSet = dealTheCards(allCards, 54); // setGameCards and setRemainingCards included
            arrangeReversedCards(gameSet);
            setResetBit(false);
        }
    }, [resetBit]) // resetBit changes trigger the control of gameSet and remainingCards

    return (
        <DashboardContext.Provider
        value={{"counter": [counter, setCounter],
        "isGameFinished": [isGameFinished, setIsGameFinished],
        "resetGame": resetGame,
        "decreaseInEveryTenSeconds": [decreaseInEveryTenSeconds ,setDecreaseInEveryTenSeconds]}}>
            {props.children}
        </DashboardContext.Provider>
    );
}
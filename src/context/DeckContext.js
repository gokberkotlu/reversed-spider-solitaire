import React, { useState, createContext, useEffect } from "react";
import { cardSeries } from '../utils/CardSeries';

export const DeckContext = createContext();

export const DeckProvider = props => {

    // States
    const [gameCards, setGameCards] = useState([[],[],[],[],[],[],[],[],[],[]]); // Represents cards on table
    const [remainingCards, setRemainingCards] = useState([]); // Cards outside the game
    const [numberOfCompleted, setNumberOfCompleted] = useState(Array(0)); // Shows number of completed series
    const [newCardPacks, setNewCardPacks] = useState(Array(5)); // Shows number of new card packs
    const [isGameStarted, setIsGameStarted] = useState(false); // Set state when any card action happened
    const [statesLog, setStatesLog] = useState([]); // Log States to Undo the Game

    // States: Score Datas
    const [score, setScore] = useState(500); // Game score which starts 500
    const [highScore, setHighScore] = useState(+localStorage.getItem('highScore')); // Recorded highscore to store in localStorage

    const dealTheCards = (cards, numberOfCards) => {
        
        // Save Changes When the New Card Pack Added
        logGameChanges();

        if(cards.length >= 10) {
            let gameSet = [...gameCards];
            for(let i = 0; i < numberOfCards; i++) {
                gameSet[i%10].push(cards[i]);
            }
            setGameCards(gameSet);
            setRemainingCards(cards.splice(numberOfCards));

            return gameSet;
        }
    }

    // arrangeReversedCards arranges the reversed card at the start
    const arrangeReversedCards = (gameSet) => {
        gameSet.forEach(cards => {
            for(let i = 0; i < cards.length - 1; i++) {
                cards[i].isCardReverse = true;
            }
        })
    }

    // suffleTheCards shuffles eight decks of cards
    const suffleTheCards = () => {
        let deskNumber = 8;
        let newArray = [];
        for(let i = 0; i < deskNumber; i++) {
            newArray = newArray.concat(
                [...cardSeries.map((card) => {
                    return {
                        "cardNum": card,
                        "cardDeck": (i + 1),
                        "isCardReverse": false
                    }
                })]);
        }
        var currentIndex = newArray.length,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            [newArray[currentIndex], newArray[randomIndex]] = [
                newArray[randomIndex], newArray[currentIndex]
            ];
        }
        return newArray;
    }

    // logGameChanges takes snapshots before all card actions and stores them inside statesLog
    const logGameChanges = () => {
        let addToLog = {
            "gameCardsBefore": JSON.parse(JSON.stringify(gameCards)),
            "remainingCardsBefore": JSON.parse(JSON.stringify(remainingCards)),
            "numberOfCompletedBefore": JSON.parse(JSON.stringify(numberOfCompleted)),
            "newCardPacksBefore": JSON.parse(JSON.stringify(newCardPacks))
        }
        setStatesLog(prevState => [...prevState, addToLog]);
    }

    // undoTheGame sets game states with last logged snapshot
    const undoTheGame = () => {
        let statesLogValue = [...statesLog];
        let statesLogValueLength = statesLogValue.length
        if(statesLogValueLength > 1) {
            let beforeStates = statesLogValue[statesLogValueLength - 1]; // Go back in the game by having "before value of last screen"
            setGameCards(beforeStates.gameCardsBefore);
            setRemainingCards(beforeStates.remainingCardsBefore);
            setNumberOfCompleted(beforeStates.numberOfCompletedBefore);
            setNewCardPacks(beforeStates.newCardPacksBefore);

            // Delete current states from log when went back in the game
            setStatesLog(statesLogValue.slice(0, statesLogValueLength - 1));

            // Decrease 1 point from score for each undo click
            setScore(prevState => prevState - 1);

            // Decrease 100 points from score if completed desk is removed by clicking undo button
            if(beforeStates.numberOfCompletedBefore.length < numberOfCompleted.length) {
                let scoreDiff = numberOfCompleted.length - beforeStates.numberOfCompletedBefore.length;
                setScore(prevState => prevState - 100 * scoreDiff);
            }
        }
    }

    useEffect(() => {
        // Shuffle cards, arrange reversed cards and deal them on the game table at start
        var allCards = suffleTheCards();
        var gameSet = dealTheCards(allCards, 54);
        arrangeReversedCards(gameSet);
    }, [])

    return (
        <DeckContext.Provider
        value={{
                "gameCards": [gameCards, setGameCards],
                "remainingCards": [remainingCards, setRemainingCards],
                "numberOfCompleted": [numberOfCompleted, setNumberOfCompleted],
                "newCardPacks": [newCardPacks, setNewCardPacks],
                "isGameStarted": [isGameStarted, setIsGameStarted],
                "suffleTheCards": suffleTheCards,
                "dealTheCards": dealTheCards,
                "arrangeReversedCards": arrangeReversedCards,
                "statesLog": [statesLog, setStatesLog],
                "logGameChanges": logGameChanges,
                "undoTheGame": undoTheGame,
                "score": [score, setScore],
                "highScore": [highScore, setHighScore]
            }}>
            {props.children}
        </DeckContext.Provider>
    );
}
import React, { useContext, useEffect } from 'react';
import { DeckContext } from "../../context/DeckContext";
import { DashboardContext } from "../../context/DashboardContext";
import "./navbar.css";
import timerIcon from "../../icons/Timer.svg";
import scoreIcon from "../../icons/Score.svg";
import newGameIcon from "../../icons/NewGame.svg";
import undoIcon from "../../icons/Undo.svg";

const Navbar = () => {

    // DeckContext
    const deckContextValue = useContext(DeckContext);

    const [isGameStarted,] = deckContextValue.isGameStarted;
    const undoTheGame = deckContextValue.undoTheGame;
    const [score, setScore] = deckContextValue.score;
    const [highScore,] = deckContextValue.highScore;

    // DashboardContext
    const dashboardContextValue = useContext(DashboardContext);

    const [counter, setCounter] = dashboardContextValue.counter;
    const [decreaseInEveryTenSeconds, setDecreaseInEveryTenSeconds] = dashboardContextValue.decreaseInEveryTenSeconds;
    const resetGame = dashboardContextValue.resetGame;

    useEffect(() => {
        // Set timer with current rules
        if(isGameStarted) {
            const timer = setInterval(() => {
                let timeData = counter.split(":")
                let hour = +timeData[0];
                let minute = +timeData[1];
                let second = +timeData[2] + 1;

                // Show seconds as two digits
                if(second < 10) {
                    second = '0' + second;
                } else if(second > 59) {
                    second = '00';
                    minute = minute + 1;
                }

                // Show minutes as two digits
                if(minute < 10) {
                    minute = '0' + minute;
                } else if(minute > 59) {
                    minute = '00';
                    hour = hour + 1;
                }

                // Show hours as two digits
                if(hour < 10) {
                    hour = '0' + hour;
                }

                setCounter(`${hour}:${minute}:${second}`); // set counter with new time data

                setDecreaseInEveryTenSeconds(prevState => prevState + 1); // Increase state until it is ten

            }, 1000);
            return () => clearInterval(timer);
        }
    }, [counter, isGameStarted]);

    useEffect(() => {
        // Decrease score by two in every ten seconds
        if(decreaseInEveryTenSeconds >= 10) {
            setDecreaseInEveryTenSeconds(0);
            setScore(prevState => prevState - 2);
        }
    }, [decreaseInEveryTenSeconds])

    return (
        <nav>
            <div className="navbar-container">
                <div className="score-timer-container">
                    <div className="timer-container">
                        <img src={timerIcon} className="navbar-icon" width={20} height={20} alt="Timer" />
                        <span>{counter}</span>
                    </div>
                    <div className="score-container">
                        <img src={scoreIcon} className="navbar-icon" width={20} height={20} alt="Score" />
                        <span>{ score }</span>
                    </div>
                </div>
                <span>High Score: { (highScore === null) ? 0 : highScore }</span>
                <div className="undo-new-container">
                    <div className="undo-container">
                        <div className="navbar-btn" onClick={() => {undoTheGame()}}>
                            <img src={undoIcon} className="navbar-icon" width={20} height={20} alt="Undo" />
                            <span>Undo</span>
                        </div>
                    </div>
                    <div className="new-container">
                        <div className="navbar-btn" onClick={() => {resetGame()}}>
                            <img src={newGameIcon} className="navbar-icon" width={20} height={20} alt="New Game" />
                            <span>New</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
import { useContext } from "react";
import { DeckContext } from "../../context/DeckContext";
import { DashboardContext } from "../../context/DashboardContext";
import "./popup-win.css";

const PopupWin = () => {

    // DashboardContext
    const dashboardContextValue = useContext(DashboardContext);

    const [isGameFinished, setIsGameFinished] = dashboardContextValue.isGameFinished;
    const resetGame = dashboardContextValue.resetGame;

    // DeckContext
    const deckContextValue = useContext(DeckContext);

    const [score,] = deckContextValue.score;

    return (
        (isGameFinished && <>
            <div className="popup-win">
                <div className="popup-close-btn" onClick={() => {
                    setIsGameFinished(false);
                }}>
                    <div className="bar"></div>
                </div>
                <div>You Win!</div>
                <button className="popup-reset-btn" onClick={() => {
                    resetGame();
                }}>New Game</button>
                <p className="popup-score">
                    <span className="score-bold">Score: </span>{score}
                </p>
            </div>
            <div className="blur-container"></div>
        </>)
    );
}
 
export default PopupWin;
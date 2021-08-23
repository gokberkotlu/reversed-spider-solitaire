import CardFront from "../card/card-templates/card-front/CardFront"
import EmptyCardBox from "../empty-card-box/EmptyCardBox";
import { useContext } from "react";
import { DeckContext } from "../../context/DeckContext";
import "./completed-decks.css"

const CompletedDecks = () => {
    
    
    const deckContextValue = useContext(DeckContext);
    const [numberOfCompleted,] = deckContextValue.numberOfCompleted;

    const uncompletedBoxes = Array(8);
    // Create 8 areas and fill them with completed series or empty boxes
    return (
        <div className="completed-decks-container">
            {[...uncompletedBoxes].map((value, index) => {
                // Check how many series are completed
                if(numberOfCompleted.length > index) {
                    return (
                        <div className="completed-decks" key={"completed-decks" + index}>
                            <CardFront cardNumber={'K'}  key={"completed-decks" + index}/>
                        </div>
                    )
                } else {
                    return (
                        <div className="completed-decks" key={"completed-decks" + index}>
                            <EmptyCardBox />
                        </div>
                    )
                }
            })}
        </div>
    );
}
 
export default CompletedDecks;
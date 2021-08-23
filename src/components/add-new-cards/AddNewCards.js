import CardBack from "../card/card-templates/card-back/CardBack";
import { useContext } from "react";
import { DeckContext } from "../../context/DeckContext";
import './add-new-cards.css'

const AddNewCards = () => {
    
    // DeckContext
    const deckContextValue = useContext(DeckContext);

    const dealTheCards = deckContextValue.dealTheCards;
    const [remainingCards,] = deckContextValue.remainingCards;
    const [newCardPacks, setNewCardPacks] = deckContextValue.newCardPacks;
    const [isGameStarted, setIsGameStarted] = deckContextValue.isGameStarted;
    const [, setScore] = deckContextValue.score;

    return (
        <div className="add-new-cards-container">
            {[...newCardPacks].map((val, index) => {
                if(index === newCardPacks.length - 1) {
                    return (
                        <div key={'pack-' + index}
                        className="add-new-cards"
                        onClick={() => {

                                // Deal new card pack
                                dealTheCards(remainingCards, 10);
                                let newCardPacksClone = [...newCardPacks];
                                newCardPacksClone.pop();
                                setNewCardPacks(newCardPacksClone);

                                // Start timer when first 10 card pack added
                                if(!isGameStarted) {
                                    setIsGameStarted(true);
                                }

                                // Decrease score by 1 when new card pack added
                                setScore(prevState => prevState - 1);
                            }}>
                            <CardBack />
                        </div>
                    )
                } else {
                    return (
                        <div key={'pack-' + index} className="add-new-cards">
                            <CardBack />
                        </div>
                    )
                }
            })}
        </div>
    );
}
 
export default AddNewCards;
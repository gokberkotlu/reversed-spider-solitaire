import React, { useContext } from 'react';
import { DeckContext } from '../../context/DeckContext';
import CardHolder from "../card-holder/CardHolder";
import "./card-holder-table.css"

const CardHolderTable = () => {

    const deckContextValue = useContext(DeckContext);
    const [gameCards,] = deckContextValue.gameCards;

    return (
        <div className="card-holder-container">
            {gameCards.map((cards, index) => (
                <CardHolder cards={cards} cardUnitNumber={index + 1} key={'card-unit-' + (index + 1)}/>
            ))}
        </div>
    );
}
 
export default React.memo(CardHolderTable);
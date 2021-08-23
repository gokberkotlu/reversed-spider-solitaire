import AddNewCards from "../add-new-cards/AddNewCards";
import CompletedDecks from "../completed-decks/CompletedDecks";
import "./top-panel.css"

const TopPanel = () => {
    return (
        <div className="top-panel">
            <AddNewCards />
            <CompletedDecks />
        </div>
    );
}
 
export default TopPanel;
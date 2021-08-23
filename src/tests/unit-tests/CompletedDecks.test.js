import { render } from '@testing-library/react';
import renderer from "react-test-renderer";
import CompletedDecks from '../../components/completed-decks/CompletedDecks';
import { DeckProvider } from '../../context/DeckContext';

describe('CompletedDecks', () => {
    it('should render CompletedDecks component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                <CompletedDecks />
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render 8 containers for completed and uncompleted decks', () => {
        render(
            <DeckProvider value={null}>
                <CompletedDecks />
            </DeckProvider>
        );
        expect(document.getElementsByClassName("completed-decks").length).toBe(8);
    })
})
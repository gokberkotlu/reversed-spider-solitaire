import renderer from "react-test-renderer";
import { render, fireEvent } from '@testing-library/react';
import { DeckProvider } from '../../context/DeckContext';
import AddNewCards from "../../components/add-new-cards/AddNewCards";

describe('Add new card packs', () => {
    it('should render AddNewCard component', () => {
        const tree = renderer.create(
            <DeckProvider>
                <AddNewCards />
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render five elements which have "add-new-cards" class', () => {
        render(
            <DeckProvider>
                <AddNewCards />
            </DeckProvider>
        );
        expect(document.getElementsByClassName("add-new-cards").length).toBe(5);
    })

    it('should decrease the number of new card pack containers by one, when last of them is clicked', () => {
        render(
            <DeckProvider>
                <AddNewCards />
            </DeckProvider>
        );
        const addNewCardElements = document.querySelectorAll(".add-new-cards");
        const lastAddNewCardElement = addNewCardElements[addNewCardElements.length - 1];
        fireEvent.click(lastAddNewCardElement);
        expect(document.getElementsByClassName("add-new-cards").length).toBe(4);
    })
})
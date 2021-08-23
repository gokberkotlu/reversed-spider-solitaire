import React from 'react';
import { screen, render } from '@testing-library/react';
import renderer from "react-test-renderer";
import PopupWin from "../../components/popup-win/PopupWin";
import { DeckProvider } from '../../context/DeckContext';
import { DashboardContext, DashboardProvider } from "../../context/DashboardContext";

describe('PopupWin component', () => {

    it('should render PopupWin component', () => {
        const tree = renderer.create(
            <DeckProvider>
                <DashboardProvider>
                    <PopupWin />
                </DashboardProvider>
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should have text content You Win! when game is finished', () => {
        render(
            <DeckProvider>
                <DashboardContext.Provider
                value={{
                    "isGameFinished": [true, null]
                }}>
                    <PopupWin />
                </DashboardContext.Provider>
            </DeckProvider>
        );
        expect(screen.getByText("You Win!")).toBeTruthy();
    })

    it('should have new game button inside popup when game is finished', () => {
        render(
            <DeckProvider>
                <DashboardContext.Provider
                value={{
                    "isGameFinished": [true, null]
                }}>
                    <PopupWin />
                </DashboardContext.Provider>
            </DeckProvider>
        );
        const newGameButton = screen.getByRole('button', { name: 'New Game' });
        expect(newGameButton).toBeTruthy();
    })
})
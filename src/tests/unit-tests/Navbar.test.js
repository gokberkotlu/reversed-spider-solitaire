import { screen, render } from '@testing-library/react';
import renderer from "react-test-renderer";
import Navbar from '../../components/navbar/Navbar';
import { DeckProvider } from '../../context/DeckContext';
import { DashboardProvider } from "../../context/DashboardContext"

describe('Navbar component', () => {
    it('should render Navbar component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should have timer at beginning state(00:00:00)', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        );
        expect(screen.getByText(`00:00:00`)).toBeInTheDocument();
    })

    it('should have score at beginning state(500) and score should wrapped by score-container class', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        );
        expect(screen.getByText(`500`).parentElement.className).toBe("score-container");
    })

    it('should have 0 points highscore at beginning', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        );
        expect(screen.getByText(`High Score: 0`)).toBeTruthy();
    })

    it('should have undo button in the document', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        );
        const undoButton = screen.getByText(/Undo/i).parentElement;
        expect(undoButton).toBeInTheDocument();
    })

    it('should have new button in the document', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <Navbar />
                </DashboardProvider>
            </DeckProvider>
        );
        const newButton = screen.getByText(/New/i).parentElement;
        expect(newButton).toBeInTheDocument();
    })
})
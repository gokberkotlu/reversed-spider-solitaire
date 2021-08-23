import { render } from '@testing-library/react';
import renderer from "react-test-renderer";
import CardHolderTable from "../../components/card-holder-table/CardHolderTable";
import { DeckProvider } from '../../context/DeckContext';
import { DashboardProvider } from "../../context/DashboardContext"

describe('CardHolderTable component', () => {
    it('should render CardHolderTable component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <CardHolderTable />
                </DashboardProvider>
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should have ten card holder units', () => {
        render(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <CardHolderTable />
                </DashboardProvider>
            </DeckProvider>
        );
        expect(document.getElementsByClassName("card-holder-unit").length).toBe(10);
    })
})
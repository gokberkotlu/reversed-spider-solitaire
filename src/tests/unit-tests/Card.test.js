import renderer from "react-test-renderer";
import Card from '../../components/card/Card';
import { DeckProvider } from '../../context/DeckContext';

describe('Card component', () => {
    it('should render Card component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                <Card />
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
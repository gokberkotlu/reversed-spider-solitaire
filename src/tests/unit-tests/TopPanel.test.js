import renderer from "react-test-renderer";
import TopPanel from '../../components/top-panel/TopPanel';
import { DeckProvider } from '../../context/DeckContext';

describe('TopPanel component', () => {
    it('should render TopPanel component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                    <TopPanel />
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import renderer from "react-test-renderer";
import CardHolder from "../../components/card-holder/CardHolder";
import { DeckProvider } from '../../context/DeckContext';
import { DashboardProvider } from "../../context/DashboardContext"

const cards = [
    {
        "cardNum": 'A',
        "cardDeck": 1,
        "isCardReverse": true
    },
    {
        "cardNum": '2',
        "cardDeck": 1,
        "isCardReverse": true
    },
    {
        "cardNum": '3',
        "cardDeck": 1,
        "isCardReverse": false
    },
    {
        "cardNum": '4',
        "cardDeck": 1,
        "isCardReverse": false
    }
]
const cardUnitNumber = 1;

describe('CardHolder component', () => {
    it('should render CardHolder component', () => {
        const tree = renderer.create(
            <DeckProvider value={null}>
                <DashboardProvider value={null}>
                    <CardHolder cards={cards} cardUnitNumber={cardUnitNumber}/>
                </DashboardProvider>
            </DeckProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
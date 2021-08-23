import CardHolderTable from "./components/card-holder-table/CardHolderTable";
import { DeckProvider } from "./context/DeckContext";
import { DashboardProvider } from "./context/DashboardContext";
import TopPanel from "./components/top-panel/TopPanel";
import Navbar from "./components/navbar/Navbar";
import PopupWin from "./components/popup-win/PopupWin";

function App() {
  return (
      <DeckProvider>
        <DashboardProvider>
          <div className="App">
            <PopupWin />
            <Navbar />
            <TopPanel />
            <CardHolderTable />
          </div>
        </DashboardProvider>
      </DeckProvider>
  );
}

export default App;

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Map from "./components/Map";
import DirectionControl from "./components/direction-control/DirectionControl";
import LocationContextProvider from "./context/LocationContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <LocationContextProvider>
      <div className="App">
        <div className="w-full h-full relative">
          <Map />
          <DirectionControl />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </LocationContextProvider>
  );
}

export default App;

import "./App.css";
import Map from "./components/Map";
import Controls from "./components/Controls";
import LocationContextProvider from "./context/LocationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LocationContextProvider>
      <div className="App">
        {/* <div className="w-[90%] h-[90%] flex"> */}
        <div className="w-full h-full">
          <div className="w-full h-full relative">
            <Map />

            <Controls />
          </div>

          {/* <div className="w-[70%] border-r-2">
            <Map />
          </div>

          <div className="w-[30%]">
            <Controls />
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </LocationContextProvider>
  );
}

export default App;

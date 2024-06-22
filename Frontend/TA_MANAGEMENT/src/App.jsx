import { Outlet } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <>
      <div className="h-screen bg-custom-purple ">
        <div>
          <Header />
        </div>
        <div className="flex justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

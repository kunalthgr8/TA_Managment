
import "./App.css";
// import Signup from "./components/Signup/signup";
// import signup from index
import {Signup,Login,Header,Dashboard} from "./components/index";

function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      {/* <Signup/>
      <Login/> */}
      <Header/>
      <Dashboard/>


    </>
  );
}

export default App;

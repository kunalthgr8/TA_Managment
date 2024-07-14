import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(login(JSON.parse(token)));
      console.log("TOKEN", JSON.parse(token));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-custom-purple">
      <Header />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

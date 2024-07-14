import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faculty, login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isFaculty = localStorage.getItem("isFaculty");
    if (token && !isAuthenticated) {
      dispatch(login(JSON.parse(token)));
      if (isFaculty) {
        dispatch(faculty());
      }

      if (isFaculty) {
        dispatch;
      }
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

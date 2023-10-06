import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { authState } from "./store/authState";
import { ListDo } from "./components/ListDo";

function App() {
  return (
    <div className="m-0 p-0">
      <RecoilRoot>
        <Router>
          <InitState />
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/list" element={<ListDo />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
     // console.log(data);

      if (data.name != 'TokenExpiredError') {
        setAuth({ token: token, username: data });
        navigate("/list");
      } else {
        navigate("/");
      }
    } catch (e) {
      navigate("/");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;

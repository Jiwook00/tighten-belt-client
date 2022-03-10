import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import "./App.css";
import Rank from "./page/Rank";
import { useEffect, useState } from "react";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="frame">
      <dev className="header">
        <div className="date">2022.03.10 ~ 2022.04.09</div>
        <div>
          <Switch>
            <Route
              path="/login"
              render={() => {
                console.log("islogin", isLogin);
                if (isLogin) {
                  return <Redirect to="/main" />;
                } else {
                  return <Login setIsLogin={setIsLogin} isLogin={isLogin} />;
                }
              }}
            />
            <Route
              path="/main"
              render={() => {
                if (isLogin) {
                  return <Main isLogin={isLogin} />;
                } else {
                  return <Login setIsLogin={setIsLogin} isLogin={isLogin} />;
                }
              }}
            />
            <Route path="/rank" render={() => <Rank isLogin={isLogin} />} />
            <Redirect path="/" to="/login" />
          </Switch>
        </div>
      </dev>
    </div>
  );
};

export default App;

import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import "./App.css";
import Rank from "./page/Rank";
import { useEffect, useState } from "react";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  // const isLogin = () => {
  //   console.log("ddd");
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     <Route element={<Navigate replace to="/" />} />;
  //   }
  // };

  useEffect(() => {
    console.log("1111is login", isLogin);

    const token = localStorage.getItem("token");
    console.log("token : ", token);
    if (token) {
      setIsLogin(true);
    } else {
      console.log("토큰 없음");
    }
    console.log("is login", isLogin);
  }, []);

  return (
    <div className="frame">
      <dev className="header">
        <div className="logo">~2022.04.09</div>
        <div>
          <Switch>
            <Route
              path="/login"
              render={() => {
                console.log("render islogin", isLogin);
                if (isLogin) {
                  return <Redirect to="/main" />;
                } else {
                  return <Login setIsLogin={setIsLogin} isLogin={isLogin} />;
                }
              }}
            />
            <Route path="/main" render={() => <Main isLogin={isLogin} />} />
            <Route path="/rank" render={() => <Rank isLogin={isLogin} />} />
            <Redirect path="/" to="/login" />
          </Switch>
        </div>
      </dev>
    </div>
  );
};

export default App;

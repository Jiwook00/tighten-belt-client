import { Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import Page1 from "./page/Page1";
import "./App.css";

const App = () => {
  return (
    <div className="frame">
      <dev className="header">
        <div className="logo">여기 날짜</div>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/page1" element={<Page1 />} />
          </Routes>
        </div>
      </dev>
    </div>
  );
};

export default App;

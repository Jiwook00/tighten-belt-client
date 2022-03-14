import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Main.css";
import { HOST } from "../config";

const Main = () => {
  const [myData, setMyData] = useState({});
  const [expense, setExpense] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = ({ target: { value } }) => setExpense(value);
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    if (expense.length !== 0) {
      if (typeof Number(expense) === "number") {
        postExpense(Number(expense));
      } else {
        alert("숫자만 입력 가능합니다.");
      }
      setDisabled(false);
      setExpense("");
    } else {
      setDisabled(false);
      setExpense("");
    }
  };

  const getAccount = async () => {
    const data = await axios.get(`${HOST}/accounts/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMyData(data.data);
  };

  const postExpense = async (expense) => {
    const result = await axios.post(
      `${HOST}/accounts`,
      { expense },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMyData(result.data);
  };

  useEffect(() => {
    getAccount();
  }, {});

  return (
    <div>
      <div className="percent-box">
        <span className="percent-value">{myData.percent}</span>
        <span className="percent">%</span>
        <span className="current">{myData.current}원 남음</span>
      </div>
      <div className="submit-box">
        <form onSubmit={handleSubmit}>
          <input
            className="expense-input"
            type="number"
            name="expense"
            value={expense}
            placeholder={"티끌 모아 티끌 "}
            onChange={handleChange}
          />
          <button type="submit" className="expense-btn" disabled={disabled}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;

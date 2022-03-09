import axios from "axios";
import React, { useState, useEffect } from "react";

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
    const data = await axios.get("http://localhost:8080/accounts/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data : ", data);
    setMyData(data.data);
  };

  const postExpense = async (expense) => {
    const result = await axios.post(
      "http://localhost:8080/accounts",
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
      <div className="percent">{myData.percent} %</div>
      <div className="current">{myData.current}원 남음</div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="expense"
          value={expense}
          onChange={handleChange}
        />
        <button type="submit" disabled={disabled}>
          저장하기
        </button>
      </form>
    </div>
  );
};

export default Main;

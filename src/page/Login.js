import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HOST } from "../config";

const Login = ({ setLogin }) => {
  let history = useHistory();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChangeNickName = ({ target: { value } }) => setNickname(value);
  const handleChangePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    postSingin(nickname, password);

    setDisabled(false);
    setNickname("");
    setPassword("");
  };

  const postSingin = async (nickname, password) => {
    console.log(`${nickname} . . ${password}`);
    const result = await axios.post(`${HOST}/users/singin`, {
      nickname,
      password,
    });
    if (result.status === 200) {
      localStorage.setItem("token", result.data.token);
      setLogin(true);
      history.replace("/");
    } else {
      alert("아이디와 비밀번호를 확인해주세요!");
    }
  };

  return (
    <div>
      <div className="login_container">
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="form_items">
            <label className="form_items label">닉네임</label>
            <input
              className="form_input"
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleChangeNickName}
            />
          </div>
          <div className="form_items">
            <label className="form_items label">비밀번호</label>
            <input
              className="form_input"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <button type="submit" disabled={disabled}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

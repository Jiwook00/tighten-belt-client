import React from "react";

const RankItem = ({ data }) => {
  console.log("data: ", data);

  const { id, name, current, percent } = data;
  return (
    <div>
      <div className="s">
        <span className="nickname">{name}</span>
        <span className="user-current"> {current}원</span>
        <span className="user-percent"> {percent}%</span>
      </div>
    </div>
  );
};

export default RankItem;

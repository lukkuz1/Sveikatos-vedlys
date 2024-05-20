import React from "react";
import { useNavigate } from "react-router-dom";

export const Healthy_diary_views_page: React.FC = () => {
  const navigate = useNavigate();

  const OpenDiaryEntryPage = () => {
    navigate("/healthy/diarypage/entry");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 30,
        }}
      >
        <button onClick={OpenDiaryEntryPage}>Dienoraščio peržiūra</button>
        <button>Dienoraščio pridėjimas</button>
      </div>
    </div>
  );
};

export default Healthy_diary_views_page;

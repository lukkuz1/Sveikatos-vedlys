import React from "react";

export const Healthy_diary_view_page: React.FC = () => {

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
        <button>Healthy diary edit</button>
        <button>Healthy diary remove</button>
      </div>
    </div>
  )
}

export default Healthy_diary_view_page;

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
        <button>Dienoraščio įrašo redagavimas</button>
        <button>Dienoraščio įrašo ištrinimas</button>
      </div>
    </div>
  )
}

export default Healthy_diary_view_page;

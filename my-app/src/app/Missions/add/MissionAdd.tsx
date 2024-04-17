import React, { useState } from "react";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { app } from "../../../services/firebase";

export default function MissionAdd() {
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");

  let [DataArray, setDataArray] = useState([]);

  const handleInputChange1 = (e: any) => {
    setInputValue1(e.target.value);
  };
  const handleInputChange2 = (e: any) => {
    setInputValue2(e.target.value);
  };

  const AddData = async () => {
    const db = getDatabase(app);
    const newDoc = push(ref(db, "missions"));
    set(newDoc, {
      missionName: inputValue1,
      missionDescription: inputValue2,
    })
      .then(() => {
        alert("Misija sėkmingai pridėta!");
      })
      .catch((error) => {
        alert("Klaida: " + error);
      });
  };



  return (
    <div className="all">
      <div className="add">
        <h2>Misijos pavadinimas</h2>
        <input type="text" value={inputValue1} onChange={handleInputChange1} />
        <h2>Misijos aprašymas</h2>
        <input type="text" value={inputValue2} onChange={handleInputChange2} />
        <br />
        <button onClick={AddData}>Pridėti</button>
      </div>
    </div>
  );
}

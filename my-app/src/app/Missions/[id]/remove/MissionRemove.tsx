import React, { useState } from "react";
import { getDatabase, ref, set, push, get, remove} from "firebase/database";
import { app } from "../../../../services/firebase";

export default function MissionRemove() {

  const DeleteData = async () => {
    const db = getDatabase(app);
    const newDoc = push(ref(db, "missions"));
    remove(newDoc);
  };



  return (
    <div className="all">
      <div className="add">
        <h2>Misijos ištrinimas</h2>
        <button onClick={DeleteData}>Ištrinti</button>
      </div>
    </div>
  );
}

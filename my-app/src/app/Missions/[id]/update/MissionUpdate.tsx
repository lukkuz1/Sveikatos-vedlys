import React, {useState, useEffect} from 'react';
import { app } from "../../../../services/firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';

function MissionUpdate() {

  const {firebaseId} = useParams();

  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "missions/"+firebaseId);
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
              const targetObject = snapshot.val();
              setInputValue1(targetObject);
              setInputValue2(targetObject);
            } else {
              alert("error");
            }
        }
        fetchData();
    }, [firebaseId])
    

  const overwriteData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "missions/"+firebaseId);
    set(newDocRef, {
      missionName: inputValue1,
      missionDescription: inputValue2
    }).then( () => {
      alert("data updated successfully")
    }).catch((error) => {
      alert("error: "+ error);
    })
  }


  return (
    <div>

      <h1>UPDATE</h1>

      <input type='text' value={inputValue1} 
      onChange={(e) => setInputValue1(e.target.value)}/> 

      <input type='text' value={inputValue2} 
      onChange={(e) => setInputValue2(e.target.value)}/> <br/>

      <button onClick={overwriteData}>UPDATE</button>
      <br />
      <br />
      <br />
    </div>
  )
}

export default MissionUpdate;
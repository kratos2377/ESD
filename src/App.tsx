import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Attendance } from "./pages/Attendance";

function App() {
  const [checkAttendance, setCheckAttendance] = useState(false);

  const [IDs, setids] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    let ids: Array<string> = [];
    let name: Array<string> = [];
    const studentsName = ref(db, "/Name");
    const studentsId = ref(db, "/Student ID");
    // const attendance = ref(db, "/dates");
    // console.log(starCountRef);
    onValue(studentsId, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);

      ids.push(...data);
    });

    onValue(studentsName, (snapshot) => {
      const data = snapshot.val();
      name.push(...data);
    });

    setTimeout(() => {
      // console.log(names);
      // console.log(ids);
      setids([...ids]);
      setNames([...name]);
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <CircularProgress />
      ) : !checkAttendance ? (
        <div
          style={{
            height: "100vh",
            width: "100vh",
            position: "fixed",
            left: "50%",
            top: "90%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
          <Button
            variant="outlined"
            onClick={() => {
              setCheckAttendance(true);
            }}
          >
            Check Attendance
          </Button>{" "}
        </div>
      ) : (
        <Attendance names={names} ids={IDs} />
      )}
    </div>
  );
}

export default App;

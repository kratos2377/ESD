import {
  Button,
  CircularProgress,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
    }, 3000);
  }, []);

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00ff110",
        contrastText: "#ff",
      },
      secondary: {
        main: "#fff00",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: "#251D3A",
            //background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
            //background:
            //"linear-gradient(348deg, rgba(2,0,36,1) 0%, rgba(177,29,29,0.9588877787443102) 37%, rgba(145,40,182,1) 44%, rgba(0,212,255,1) 93%)",
          },
        }}
      />
      <div className="App">
        {loading ? (
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
            <CircularProgress />
          </div>
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
    </ThemeProvider>
  );
}

export default App;

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import { Attendance } from "./pages/Attendance";

function App() {
  const [checkAttendance, setCheckAttendance] = useState(false);
  const [value, setValue] = useState("");
  const [seeAttendance, setSeeAttendance] = useState(false);
  return (
    <div className="App">
      {!checkAttendance ? (
        <Button
          variant="outlined"
          onClick={() => {
            setCheckAttendance(true);
          }}
        >
          Check Attendance
        </Button>
      ) : !seeAttendance ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Choose class"
              //onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginTop: "20px" }}>
            <Button
              style={{ marginRight: "10px" }}
              variant="outlined"
              onClick={() => {
                setSeeAttendance(true);
              }}
            >
              Check
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setCheckAttendance(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Attendance />
      )}
    </div>
  );
}

export default App;

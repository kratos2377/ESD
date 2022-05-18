import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { styled } from "@mui/material/styles";

interface AttendanceProps {
  names: string[];
  ids: string[];
}

interface ItemType {
  tag: string;
  id: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export const Attendance: React.FC<AttendanceProps> = ({ names, ids }) => {
  const [loading, setLoading] = useState(true);
  const [stud, setStud] = useState<Array<string>>([]);
  const [id, setIDS] = useState<Array<string>>([]);
  useEffect(() => {
    const db = getDatabase();
    const attendance = ref(db, "/attendance");
    let students: Array<string> = [];
    let idC: Array<string> = [];
    onValue(attendance, (snapshot) => {
      const data = snapshot.val();
      //console.log(data);
      // setIDS([...data]);
      //console.log(data);
      Object.entries(data).forEach((item) => {
        //console.log(item);
        let val: string = item[1] as string;
        idC.push(item[1] as string);
        //console.log(val);
        // console.log(item[1]);
        let str: string = val.toString();
        //console.log(val.toUpperCase().toString());
        //console.log(ids);
        const index = ids.findIndex((item) => item === str);
        //console.log(index);
        students.push(names[index]);
      });
      //data.map((item) => console.log(item));
      // for (var i = 0; i < data.length; i++) {

      //   //console.log(val.toUpperCase().toString());
      //   //console.log(ids);
      //   //const index = ids.findIndex((item) => item === str);
      //   //console.log(index);
      //   //students.push(names[index]);
      // }
    });

    setTimeout(() => {
      setLoading(false);
      setIDS([...idC]);
      setStud([...students]);
    }, 4000);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "80%",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          rowSpacing={3}
          margin={3}
          display="flex"
          justifyContent="space-evenly"
          flexDirection="row"
        >
          {stud.map((item, idx) => (
            <Grid item xs={3} key={idx}>
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Card sx={{ maxWidth: 200, height: 100 }} variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 10 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {item}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {id[idx]}
                      </Typography>
                    </CardContent>
                  </React.Fragment>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

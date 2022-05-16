import React from "react";
import {
  Grid,
  Paper,
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
interface AttendanceProps {}

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

export const Attendance: React.FC<AttendanceProps> = ({}) => {
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
      <Grid
        container
        rowSpacing={3}
        margin={3}
        display="flex"
        justifyContent="space-evenly"
        flexDirection="row"
      >
        {Array.from(Array(10)).map((_, index) => (
          <Grid item xs={4} key={index}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                {card}
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

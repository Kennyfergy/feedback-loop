import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Feelings.css";

function Feelings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const feedback = useSelector((store) => store.feedbackReducer);

  let feelingsInput = feedback.feeling;

  const [feeling, setFeeling] = useState(feelingsInput || "");
  const [errorMessage, setErrorMessage] = useState(""); //state for error message

  const proceedToNextPage = (event) => {
    dispatch({
      type: "SET_FEELING",
      payload: { property: "feeling", value: feeling },
    });
    history.push("/understanding");
  };

  //function to display an error message if input is not between 1 and 5
  const displayErrorAndClear = () => {
    setFeeling("");
    setErrorMessage("Enter a number between 1 and 5");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    feeling === "" || feeling > 5 || feeling < 1
      ? displayErrorAndClear()
      : proceedToNextPage();
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          How Are You Feeling Today on a scale of 1-5
        </Typography>
        <TextField
          onChange={(event) => {
            setFeeling(Number(event.target.value));
            setErrorMessage(""); // Clear the error message when the user starts typing
          }}
          label="Enter a number between 1-5"
          type="number"
          variant="outlined"
          value={feeling}
          fullWidth
          inputProps={{ min: "1", max: "5", step: "1" }}
        />
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}{" "}
        {/* Display error message if it exists */}
      </CardContent>
      <div className="card-actions-container">
        <CardActions>
          <Button
            onClick={handleSubmit}
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            NEXT
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Feelings;

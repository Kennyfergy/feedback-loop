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
import "./Support.css";

function Support() {
  const dispatch = useDispatch();
  const history = useHistory();
  const feedback = useSelector((store) => store.feedbackReducer);

  let supportInput = feedback.support;

  const [support, setSupport] = useState(supportInput || "");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  //takes user back a page
  const backClick = (event) => {
    event.preventDefault();
    history.push("/understanding");
  };

  //takes user to next page
  const proceedToNextPage = (event) => {
    dispatch({
      type: "SET_SUPPORT",
      payload: { property: "support", value: support },
    });
    history.push("/comments");
  };

  //function to display an error message if input is not between 1 and 5
  const displayErrorAndClear = () => {
    setSupport("");
    setErrorMessage("Enter a number between 1 and 5");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ternary checking if data is valid
    support === "" || support > 5 || support < 1
      ? displayErrorAndClear()
      : proceedToNextPage();
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          How Supported Do You Feel on a scale of 1-5
        </Typography>
        <TextField
          onChange={(event) => {
            setSupport(Number(event.target.value));
            setErrorMessage(""); // Clear the error message when the user starts typing
          }}
          label="Enter a number between 1-5"
          type="number"
          variant="outlined"
          value={support}
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
          <Button
            onClick={backClick}
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            Go Back
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Support;

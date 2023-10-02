import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import "./Review.css";
//only page that needs get route to display data
//axios POST
function Review() {
  const history = useHistory();
  const dispatch = useDispatch();
  const feedback = useSelector((store) => store.feedbackReducer);

  const [errorMessage, setErrorMessage] = useState(""); // Local state to store error message

  // Function to check if feedback data is complete
  const isFeedbackComplete = () => {
    // Check if each feedback property has data
    return feedback.feeling && feedback.understanding && feedback.support;
  };

  const submitData = () => {
    if (isFeedbackComplete()) {
      axios
        .post("/feedback", feedback)
        .then((res) => {
          console.log(`Submitted Data`, res);
          history.push("/success");
          dispatch({ type: "CLEAR_FEEDBACK" });
        })
        .catch((err) => {
          console.log("Error submitting", err);
        });
    } else {
      setErrorMessage("Please complete all feedback pages before submitting");
    }
  };
  const backClick = (event) => {
    event.preventDefault();
    history.push("/comments");
  };
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          Review
        </Typography>
        <br />
        <div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <p>Feelings: {feedback.feeling}</p>
          <p>Understanding: {feedback.understanding}</p>
          <p>Support: {feedback.support}</p>
          <p>Comments: {feedback.comments}</p>
        </div>
      </CardContent>
      <div className="card-actions-container">
        <CardActions>
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
          <Button
            onClick={submitData}
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            Submit
          </Button>
        </CardActions>
      </div>
    </Card>
  );
} //end review function
export default Review;

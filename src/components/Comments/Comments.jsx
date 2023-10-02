import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import "./Comments.css";

//function to take comments input and add to feedback reducer
function Comments() {
  const dispatch = useDispatch();
  const history = useHistory();
  const feedback = useSelector((store) => store.feedbackReducer);

  let userComments = feedback.comments;

  const [comments, setComments] = useState(userComments);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_COMMENTS",
      payload: { property: "comments", value: comments },
    });
    // empty input field
    setComments("");
    //
    history.push("/review"); //moves user to the next page
  };
  //function to take user back a page
  const backClick = (event) => {
    event.preventDefault();
    history.push("/support");
  };
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div">
          Any comments you want to leave
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Feeling?
        </Typography> */}
        <TextField
          label="Add comments"
          type="text"
          variant="outlined"
          fullWidth
          onChange={(event) => setComments(event.target.value)}
        />
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
export default Comments;

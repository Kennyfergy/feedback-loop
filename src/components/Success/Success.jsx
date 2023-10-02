import { useHistory } from "react-router-dom";
import { Button, Typography, Container, Paper } from "@mui/material";
import "./Success.css";

export default function Success() {
  const history = useHistory();

  //function to take users to the home page
  function newSurvey() {
    history.push("/");
  }

  return (
    <Container className="success-container">
      <Paper className="success-paper" elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Congratulations!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Thanks for completing the survey.
        </Typography>
        <Button
          onClick={newSurvey}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            "&:hover": {
              backgroundColor: "#c0c0c0",
            },
          }}
        >
          Click to This Survey Again
        </Button>
      </Paper>
    </Container>
  );
}

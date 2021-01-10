import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ReplyIcon from "@material-ui/icons/Reply";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux
import { useDispatch } from "react-redux";
import { reviewActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  replyTextfield: {
    width: "100%",
  },
}));

//Custom Functions
function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    // second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default function ReviewReplyModal(props) {
  const classes = useStyles();

  //Modal
  const [open, setOpen] = React.useState(false);
  const review = props.review;
  const [reply, setReply] = React.useState("");

  //Redux
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Main function
  const onSubmit = () => {
    if (reply !== "") {
      dispatch(reviewActions.reply({ reviewId: review.id, content: reply }));
      handleClose();
    }
  };

  return (
    <div>
      <Tooltip title="Reply this review" aria-label="reply">
        <IconButton
          aria-label="reply-btn"
          component="span"
          onClick={handleOpen}
          disabled={props.disable}
        >
          <ReplyIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="sm" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Reply Review
              </Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong> User email:</strong>{" "}
                    {(review.user && review.user.email) || ""}
                  </Typography>
                </Grid>
                <Grid container item direction="row">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong> Created at:</strong>{" "}
                      {(review.inserted_at && dateFormat(review.inserted_at)) ||
                        ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong> Updated at:</strong>{" "}
                      {(review.updated_at && dateFormat(review.updated_at)) ||
                        ""}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {" "}
                    <strong> Point:</strong> {review.point || ""}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong> Content:</strong> {review.content || ""}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="reply-multiline"
                    className={classes.replyTextfield}
                    label="Reviews"
                    multiline
                    rows={4}
                    value={reply}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid
                style={{ marginTop: "10px" }}
                container
                justify="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

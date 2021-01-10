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
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  repliesContainer: {
    maxHeight: "300px",
    overflow: "auto",
  },
  replyContainer: {
    marginTop: "20px",
  },
  replyContent: {
    paddingLeft: "20px",
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

export default function ReviewViewModal(props) {
  const classes = useStyles();

  //Modal
  const [open, setOpen] = React.useState(false);
  const review = props.review;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Main function

  return (
    <div>
      <Tooltip title="View detail" aria-label="view">
        <IconButton
          aria-label="view-btn"
          component="span"
          onClick={handleOpen}
          disabled={props.disable}
        >
          <VisibilityIcon />
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
                Review Detail
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
                  <Typography variant="body2">
                    <strong>
                      Reviews ({review.replies && review.replies.length}):
                    </strong>
                  </Typography>
                  <Container className={classes.repliesContainer}>
                    {review.replies &&
                      review.replies.map((element, index) => (
                        <Grid
                          key={index}
                          container
                          className={classes.replyContainer}
                        >
                          <Grid item xs={12} container justify="space-between">
                            <Grid item xs={12} sm={6}>
                              <Typography key={index} variant="body2">
                                <strong>
                                  {(element.user && element.user.email) || ""}
                                </strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography key={index} variant="body2">
                                {(element.updated_at &&
                                  dateFormat(element.updated_at)) ||
                                  ""}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography
                            className={classes.replyContent}
                            key={index}
                            variant="body2"
                          >
                            {element.content}
                          </Typography>
                        </Grid>
                      ))}
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../assets/logo-sosam.png";
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from "../components/AlertDialog";

import { signUp, clearLoginError } from "../actions/authactions";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "lightslategrey",
    width: 210,
    height: 210
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refferalId, setRefferalId] = useState("");

  useEffect(() => {
    if (auth.info) {
      props.history.push("/");
    }
  });

  const handleFnameChange = e => {
    setFname(e.target.value);
  };

  const handleLnameChange = e => {
    setLname(e.target.value);
  };

  const handleMobileChange = e => {
    setMobile(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleRefferalIdChange = e => {
    setRefferalId(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO FIREBASE : fname,
    // dispatch(signIn(email, password));
    dispatch(signUp(fname, lname, mobile, email, password, refferalId));
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    dispatch(clearLoginError());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logo} alt="Logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            autoComplete="fname"
            onChange={handleFnameChange}
            value={fname}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            autoComplete="lname"
            onChange={handleLnameChange}
            value={lname}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile (10 digit)"
            type="number"
            name="mobile"
            autoComplete="mobile"
            onChange={handleMobileChange}
            value={mobile}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="refferalId"
            label="Referral Id (Optional)"
            id="refferalId"
            value={refferalId}
            onChange={handleRefferalIdChange}
            autoComplete="current-refferalId"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            S'inscrire
          </Button>
        </form>
      </div>
      <AlertDialog open={auth.error.flag} onClose={handleClose}>
        Sign Up Error. Please check Email and Password.
      </AlertDialog>
    </Container>
  );
};

export default SignUp;

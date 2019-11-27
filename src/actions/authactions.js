import {
  authRef,
  userRef,
  singleUserRef,
  FIREBASE_AUTH_PERSIST
} from "../config/firebase";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  CLEAR_LOGIN_ERROR
} from "./types";
import * as firebase from "firebase";
import { AUTH_TOKEN } from "../config/dev";
import { Route, Redirect } from "react-router-dom";

export const fetchUser = () => dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: null
  });
  authRef.onAuthStateChanged(user => {
    if (user) {
      singleUserRef(user.uid).once("value", snapshot => {
        if (snapshot.val() && snapshot.val().isAdmin) {
          dispatch({
            type: FETCH_USER_SUCCESS,
            payload: user
          });
        } else {
          authRef
            .signOut()
            .then(() => {
              dispatch({
                type: USER_SIGN_IN_FAILED,
                payload: "This login is a valid user but not Admin"
              });
            })
            .catch(error => {
              dispatch({
                type: USER_SIGN_IN_FAILED,
                payload: error
              });
            });
        }
      });
    } else {
      dispatch({
        type: FETCH_USER_FAILED,
        payload: null
      });
    }
  });
};

export const signIn = (username, password) => dispatch => {
  authRef
    .setPersistence(FIREBASE_AUTH_PERSIST)
    .then(function() {
      authRef
        .signInWithEmailAndPassword(username, password)
        .then(user => {
          dispatch({
            type: USER_SIGN_IN,
            payload: null
          });
        })
        .catch(error => {
          dispatch({
            type: USER_SIGN_IN_FAILED,
            payload: error
          });
        });
    })
    .catch(function(error) {
      dispatch({
        type: USER_SIGN_IN_FAILED,
        payload: "Firebase Auth Error"
      });
    });
};

export const clearLoginError = () => dispatch => {
  dispatch({
    type: CLEAR_LOGIN_ERROR,
    payload: null
  });
};

export const signOut = () => dispatch => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const signUp = (
  fname,
  lname,
  mobile,
  email,
  password,
  refferalId
) => dispatch => {
  var regData = {
    firstName: fname,
    lastName: lname,
    mobile: mobile,
    email: email,
    usertype: "rider",
    refferalId: refferalId,
    createdAt: new Date().toISOString()
  };

  if (authRef.currentUser) {
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    authRef.currentUser
      .linkWithCredential(credential)
      .then(usercred => {
        var user = usercred.user;
        if (user) {
          authRef.currentUser
            .updateProfile({
              displayName: regData.firstName + " " + regData.lastName
            })
            .then(() => {
              authRef
                .child(authRef.currentUser.uid)
                .set(regData)
                .then(() => {
                  authRef
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {})
                    .catch(res => {
                      alert(res.message);
                    });
                });
            });
        }
      })
      .catch(error => {
        console.log("Account linking error", error);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        if (newUser) {
          authRef.currentUser
            .updateProfile({
              displayName: regData.firstName + " " + regData.lastName
            })
            .then(() => {
              // TODO FIREBASE : ERROR + ne veut pas save user dans la db /users
              userRef
                .child(authRef.currentUser.uid)
                .set(regData)
                .then(() => {
                  authRef
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {
                      this.props.navigation.navigate("Root");
                    })
                    .catch(res => {
                      alert(res.message);
                    });
                });
            });
        }
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        this.setState({ loading: false }, () => {
          alert("The email address is already in use by another account");
        });
      });
  }
};

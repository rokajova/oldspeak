import React, { Component } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import classes from "./LoginPage.module.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../Config/firebase";
import { Link } from "react-router-dom";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.signInAnonymously,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className={classes.LoginContainer}>
        <Row>
          <Col>
            {" "}
            <Button
              uiConfig={uiConfig}
              color="danger"
              firebaseAuth={firebase.auth()}
              onClick={() => {
                firebase.auth().signInAnonymously();
              }}
              disabled
            >
              (don't touch)
            </Button>
          </Col>
          <Col>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(LoginPage);

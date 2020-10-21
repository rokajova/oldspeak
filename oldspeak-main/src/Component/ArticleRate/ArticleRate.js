import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container, Spinner } from "reactstrap";
//firebase ref
const db = firebase.firestore();

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRatedPositive: false,
      hasRatedNegative: false,
      hasLoaded: false,
    };
  }

  componentDidMount() {
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    userRef.get().then((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedPositive: true, hasLoaded: true });
      }
      if (
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedNegative: true, hasLoaded: true });
      } else {
        this.setState({ hasLoaded: true });
      }
    });
  }

  positiveRating = () => {
    //get user and article refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    const articleRef = db
      .collection("Articles")
      .doc(this.props.location.pathname.slice(9));

    return userRef.onSnapshot((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9)) ||
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({
          hasRatedPositive: true,
        });
        console.log("You already rated this article");
      }

      //if user hasnt voted, update voted articles array with the vote
      else
        userRef
          .update({
            positiveRatings: [
              ...doc.data().positiveRatings,
              this.props.location.pathname.slice(9),
            ],
          })
          .then(() => {
            //update votes
            return articleRef.update({
              positiveRatings: firebase.firestore.FieldValue.increment(1),
            });
          });
      //update user array
    });
  };
  negativeRating = () => {
    //get user and article refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    const articleRef = db
      .collection("Articles")
      .doc(this.props.location.pathname.slice(9));

    return userRef.onSnapshot((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9)) ||
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({
          hasRatedNegative: true,
        });
        console.log("You already rated this article");
      }

      //update voted articles array
      else
        userRef
          .update({
            negativeRatings: [
              ...doc.data().negativeRatings,
              this.props.location.pathname.slice(9),
            ],
          })
          .then(() => {
            //update votes
            return articleRef.update({
              negativeRatings: firebase.firestore.FieldValue.increment(1),
            });
          });
      //update user array
    });
  };

  render() {
    const hasNotRated =
      this.state.hasRatedPositive || this.state.hasRatedNegative;
    if (this.state.hasLoaded) {
      return (
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className={classes.Button}>
            {!hasNotRated ? (
              <div>
                <Button
                  style={{
                    fontFamily: "monospace",
                    borderRadius: 0,
                    fontSize: "14px",
                    width: "6rem",
                    marginRight: "1rem",
                  }}
                  color="success"
                  onClick={() => this.positiveRating()}
                >
                  <strong>GOOD</strong>
                </Button>

                <Button
                  style={{
                    fontFamily: "monospace",
                    borderRadius: 0,
                    fontSize: "14px",
                    width: "6rem",
                  }}
                  color="danger"
                  onClick={() => this.negativeRating()}
                >
                  <strong>BAD</strong>
                </Button>
              </div>
            ) : null}
            {this.state.hasRatedPositive ? (
              <div>
                <Button
                  style={{
                    fontFamily: "monospace",
                    borderRadius: 0,
                    fontSize: "14px",
                    width: "6rem",
                    // marginRight: "1rem",
                  }}
                  color="success"
                  disabled
                >
                  <strong>GOOD</strong>
                </Button>
              </div>
            ) : null}
            {this.state.hasRatedNegative ? (
              <div>
                <Button
                  style={{
                    fontFamily: "monospace",
                    borderRadius: 0,
                    fontSize: "14px",
                    width: "6rem",
                  }}
                  color="danger"
                  disabled
                >
                  <strong>BAD</strong>
                </Button>
              </div>
            ) : null}
          </div>
        </Container>
      );
    } else {
      return (
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          <Spinner />
        </div>
      );
    }
  }
}

export default ArticleRate;

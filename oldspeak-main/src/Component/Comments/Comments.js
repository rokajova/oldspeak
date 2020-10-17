import React, { Component } from "react";
import { Container } from "reactstrap";
import CommentCard from "../CommentCard/CommentCard";
import firebase from "../../Config/firebase";

// firebase ref
const db = firebase.firestore();

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      comments: [],
    };
  }

  componentDidMount() {
    this.getMyComments();
  }

  //referencing Articles/Comment, ordering by createDate. Populate comments array with comments from db
  //no limit yet

  getMyComments = () => {
    const aid = this.props.location.pathname.slice(9);

    db.collection("Articles")
      .doc(aid)
      .collection("Comments")
      .orderBy("createDate", "asc")
      // .limit(10)
      //event listener below
      .onSnapshot((docs) => {
        if (!docs.empty) {
          let allComments = [];
          docs.forEach(function (doc) {
            const comment = {
              id: doc.id,
              ...doc.data(),
            };
            allComments.push(comment);
          });
          this.setState(
            {
              comments: allComments,
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        }
      });
  };

  render() {
    //rendering every element in comments array in state
    return (
      <div>
        <Container>
          {this.state.isLoaded
            ? this.state.comments.map((comment, index) => {
                return <CommentCard key={index} data={comment} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}

export default Comments;

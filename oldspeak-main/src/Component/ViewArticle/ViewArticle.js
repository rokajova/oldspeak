import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container, Badge, Row, Col } from "reactstrap";
import firebase from "../../Config/firebase";

//firebase ref
const db = firebase.firestore();

class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      isLoaded: false,
      isEnlarged: false,
    };
  }

  componentDidMount() {
    // if (typeof this.props.location.state !== "undefined") {
    //   if (this.props.location.state.hasOwnProperty("article")) {
    //     this.setState(
    //       {
    //         article: this.props.location.state.article,
    //       },
    //       () => {
    //         this.setState({ isLoaded: true });
    //       }
    //     );
    //   }
    // } else {
    this.getArticleByID(this.props.match.params.id);
  }

  //show modal
  modalRef = ({ toggleModal }) => {
    this.showModal = toggleModal;
  };

  //show modal
  onCommentClick = () => {
    this.showModal();
  };

  // get article from Articles collection, set article state with data
  getArticleByID = (aid) => {
    db.collection("Articles")
      .doc(aid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState(
            {
              article: doc.data(),
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        } else {
          this.props.history.push({ pathname: "/" });
        }
      });
  };

  timeStampToString = (ts) => {
    const date = new Date(ts * 1000);
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      " " +
      (date.getHours() < 10 ? "0" : "") +
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      ":" +
      (date.getSeconds() < 10 ? "0" : "") +
      date.getSeconds()
    );
  };

  handleIsEnlarged = () => {
    this.setState({ isEnlarged: !this.state.isEnlarged });
  };

  render() {
    //calculate article score
    const articleScore =
      (this.state.article.positiveRatings /
        (this.state.article.negativeRatings +
          this.state.article.positiveRatings)) *
      100;
    if (this.state.isLoaded) {
      return (
        <Container className={classes.ViewArticleContainer}>
          <Row>
            <Col sm="12" md={{ size: 12, offset: 0 }}>
              {" "}
              <div className={classes.Article}>
                <div className={classes.ArticleInfo}>
                  <header className={classes.Title}>
                    <strong>{this.state.article.title}</strong>
                  </header>
                </div>
                <div className={classes.ImageContainer}>
                  {this.state.isEnlarged ? (
                    <img
                      className={classes.ImageEnlarged}
                      src={this.state.article.featureImage}
                      onClick={this.handleIsEnlarged}
                      alt={this.state.article.title}
                    />
                  ) : (
                    <img
                      className={classes.Image}
                      src={this.state.article.featureImage}
                      alt={this.state.article.title}
                      onClick={this.handleIsEnlarged}
                    />
                  )}
                </div>
                <div className={classes.ArticleMain}>
                  {parse(this.state.article.content)}
                </div>
              </div>
              <div className={classes.Info}>
                {" "}
                {isNaN(articleScore) ? (
                  <Badge
                    style={{ marginRight: 4, borderRadius: 0 }}
                    color="dark"
                  >
                    Not Rated
                  </Badge>
                ) : (
                  <Badge
                    style={{ marginRight: 4, borderRadius: 0 }}
                    color="dark"
                  >
                    {Math.round(articleScore)} %
                  </Badge>
                )}
                <Badge
                  style={{
                    marginRight: 4,
                    borderRadius: 0,
                    letterSpacing: 1.5,
                  }}
                  color="dark"
                >
                  P: {this.state.article.createUserID.slice(0, 7)}
                </Badge>
                <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
                  {" "}
                  {this.timeStampToString(
                    this.state.article.createDate.seconds
                  )}
                </Badge>
                <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
                  R: {this.state.article.commentCount}
                </Badge>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default withRouter(ViewArticle);

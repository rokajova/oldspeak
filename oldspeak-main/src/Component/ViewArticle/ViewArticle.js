import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container, Badge, Row, Col, Progress, Tooltip } from "reactstrap";
import firebase from "../../Config/firebase";

//firebase ref
const db = firebase.firestore();

class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      isLoaded: false,
      isEnlarged: true,
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

  // addScore = (aid) => {
  //   const articleRef = db.collection("Articles").doc(aid);
  //   articleRef.update({
  //     popularScore:
  //       this.state.article.commentCount * 1000000000 +
  //       this.state.article.createDate.seconds,
  //   });
  // };

  render() {
    //calculate article score
    const articleScore =
      (this.state.article.positiveRatings /
        (this.state.article.negativeRatings +
          this.state.article.positiveRatings)) *
      100;
    // remove empty <br> and <p> tags
    function removePBR(str) {
      if (!str) return str;
      return str.replace(/<p><br[\/]?><[\/]?p>/g, "");
    }
    if (this.state.isLoaded) {
      return (
        <Container className={classes.ViewArticleContainer}>
          <Row>
            <Col sm="12" md={{ size: 12, offset: 0 }}>
              {/* <button onClick={() => this.addScore(this.props.match.params.id)}>
                Add Score
              </button>{" "} */}
              <div className={classes.TitleDiv}>
                <header className={classes.Title}>
                  <strong>{this.state.article.title}</strong>
                </header>
              </div>
              <div className={classes.Article}>
                {this.state.article.featureExtension.includes("image") && (
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
                )}
                {this.state.article.featureExtension.includes("video") && (
                  <div className={classes.ImageContainer}>
                    {this.state.isEnlarged ? (
                      <video
                        controls
                        className={classes.ImageEnlarged}
                        src={this.state.article.featureImage}
                        onClick={this.handleIsEnlarged}
                        alt={this.state.article.title}
                      />
                    ) : (
                      <video
                        className={classes.Image}
                        src={this.state.article.featureImage}
                        alt={this.state.article.title}
                        onClick={this.handleIsEnlarged}
                      />
                    )}
                  </div>
                )}

                <div className={classes.ArticleMain}>
                  {parse(removePBR(this.state.article.content))}
                </div>
              </div>
              {isNaN(articleScore) ? null : (
                <Progress multi className={classes.ProgressBar}>
                  <Progress bar value={articleScore} color="success" />
                  <Progress bar value={100 - articleScore} color="danger" />
                </Progress>
              )}
              <div className={classes.Info}>
                {" "}
                {isNaN(articleScore) ? (
                  <Badge
                    style={{
                      color: "#3b3b3b",
                      marginRight: 4,
                      borderRadius: 5,
                      backgroundColor: "#e9ecec",
                    }}
                  >
                    Not Rated
                  </Badge>
                ) : (
                  <Badge
                    style={{
                      color: "#3b3b3b",
                      marginRight: 4,
                      borderRadius: 5,
                      backgroundColor: "#e9ecec",
                    }}
                  >
                    {Math.round(articleScore)} %
                  </Badge>
                )}
                {this.state.article.commentCount ? (
                  <Badge
                    style={{
                      color: "#3b3b3b",
                      marginRight: 4,
                      borderRadius: 5,
                      backgroundColor: "#e9ecec",
                    }}
                  >
                    {this.state.article.commentCount}
                  </Badge>
                ) : (
                  <Badge
                    style={{
                      color: "#3b3b3b",
                      marginRight: 4,
                      borderRadius: 5,
                      backgroundColor: "#e9ecec",
                    }}
                  >
                    No Comments
                  </Badge>
                )}
                <Badge
                  style={{
                    color: "#3b3b3b",
                    marginRight: 4,
                    borderRadius: 5,
                    backgroundColor: "#e9ecec",
                  }}
                >
                  {this.state.article.createUserID.slice(0, 7)}
                </Badge>
                <Badge
                  style={{
                    color: "#3b3b3b",
                    marginRight: 4,
                    borderRadius: 5,
                    backgroundColor: "#e9ecec",
                  }}
                >
                  {" "}
                  {this.timeStampToString(
                    this.state.article.createDate.seconds
                  )}
                </Badge>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(ViewArticle);

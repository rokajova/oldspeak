import React from "react";
import { Badge, Container, Progress } from "reactstrap";
import { connect } from "react-redux";
import classes from "./ArticleCard.module.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export function timeStampToString(ts) {
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
}

const ArticleCard = (props) => {
  //remove html tags (not all)
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  //calculate article score
  const articleScore =
    (props.data.positiveRatings /
      (props.data.negativeRatings + props.data.positiveRatings)) *
    100;

  return (
    <div>
      <Container className={classes.ViewArticleContainer}>
        {props.auth.isEmpty ? (
          <div>
            <div className={classes.Article}>
              <div className={classes.ArticleInfo}>
                <header className={classes.Title}>
                  <strong>{props.data.title}</strong>
                </header>
              </div>
              <div className={classes.ImageContainer}>
                {props.data.featureExtension.includes("image") && (
                  <img
                    className={classes.Image}
                    src={props.data.featureImage}
                    alt=": ("
                  />
                )}
                {props.data.featureExtension.includes("video") && (
                  <video
                    controls
                    className={classes.Image}
                    src={props.data.featureImage}
                    alt=": ("
                  />
                )}
              </div>

              <div className={classes.ArticleMain}>
                {parse(removeTags(props.data.content))}
              </div>
            </div>
            {isNaN(articleScore) ? null : (
              <Progress multi className={classes.ProgressBar}>
                <Progress bar value={articleScore} color="success" />
                <Progress bar value={100 - articleScore} color="danger" />
              </Progress>
            )}
            <div className={classes.Info}>
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
              {props.data.commentCount ? (
                <Badge
                  style={{
                    color: "#3b3b3b",
                    marginRight: 4,
                    borderRadius: 5,
                    backgroundColor: "#e9ecec",
                  }}
                >
                  R: {props.data.commentCount}
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
                  No Replies
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
                P: {props.data.createUserID.slice(0, 7)}
              </Badge>
              <Badge
                style={{
                  color: "#3b3b3b",
                  marginRight: 4,
                  borderRadius: 5,
                  backgroundColor: "#e9ecec",
                }}
              >
                {timeStampToString(props.data.createDate.seconds)}
              </Badge>
            </div>
          </div>
        ) : (
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "think/" + props.data.id,
              state: { article: props.data },
            }}
          >
            <div className={classes.Article}>
              <div className={classes.ArticleInfo}>
                <header className={classes.Title}>
                  <strong>{props.data.title}</strong>
                </header>
              </div>
              <div className={classes.ImageContainer}>
                {props.data.featureExtension.includes("image") && (
                  <img
                    className={classes.Image}
                    src={props.data.featureImage}
                    alt=": ("
                  />
                )}
                {props.data.featureExtension.includes("video") && (
                  <video
                    controls
                    className={classes.Image}
                    src={props.data.featureImage}
                    alt=": ("
                  />
                )}
              </div>

              <div className={classes.ArticleMain}>
                {parse(removeTags(props.data.content))}
              </div>
            </div>
            {isNaN(articleScore) ? null : (
              <Progress multi className={classes.ProgressBar}>
                <Progress bar value={articleScore} color="success" />
                <Progress bar value={100 - articleScore} color="danger" />
              </Progress>
            )}

            <div className={classes.Info}>
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
              {props.data.commentCount ? (
                <Badge
                  style={{
                    color: "#3b3b3b",
                    marginRight: 4,
                    borderRadius: 5,
                    backgroundColor: "#e9ecec",
                  }}
                >
                  {props.data.commentCount}
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
                {props.data.createUserID.slice(0, 7)}
              </Badge>
              <Badge
                style={{
                  color: "#3b3b3b",
                  marginRight: 4,
                  borderRadius: 5,
                  backgroundColor: "#e9ecec",
                }}
              >
                {timeStampToString(props.data.createDate.seconds)}
              </Badge>
            </div>
          </Link>
        )}
      </Container>
      <hr className={classes.HorLine} />
    </div>
  );
};
const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(ArticleCard);

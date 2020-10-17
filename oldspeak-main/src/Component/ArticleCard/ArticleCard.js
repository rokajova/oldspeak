import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Badge,
  Col,
  Row,
  Container,
  Tooltip,
} from "reactstrap";
import { connect } from "react-redux";
import classes from "./ArticleCard.module.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import firebase from "../../Config/firebase";

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
          <div className={classes.Article}>
            <div className={classes.ArticleInfo}>
              <header className={classes.Title}>
                <h3>{props.data.title}</h3>
              </header>
            </div>
            <div className={classes.ImageContainer}>
              <img
                className={classes.Image}
                src={props.data.featureImage}
                alt="Feature Image"
              />
            </div>

            <div className={classes.ArticleMain}>
              {parse(removeTags(props.data.content))}
            </div>
          </div>
        ) : (
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "article/" + props.data.id,
              state: { article: props.data },
            }}
          >
            {" "}
            <div className={classes.Article}>
              <div className={classes.ArticleInfo}>
                <header className={classes.Title}>
                  <h3>{props.data.title}</h3>
                </header>
              </div>
              <div className={classes.ImageContainer}>
                <img
                  className={classes.Image}
                  src={props.data.featureImage}
                  alt="Feature Image"
                />
              </div>

              <div className={classes.ArticleMain}>
                {parse(removeTags(props.data.content))}
              </div>
            </div>
          </Link>
        )}

        <div className={classes.Info}>
          {" "}
          {isNaN(articleScore) ? (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              Not Rated
            </Badge>
          ) : (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              {Math.round(articleScore)} %
            </Badge>
          )}
          {props.data.commentCount ? (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              R:{props.data.commentCount}
            </Badge>
          ) : (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              No Replies
            </Badge>
          )}
          <Badge
            style={{ marginRight: 4, borderRadius: 0, letterSpacing: 1.5 }}
            color="dark"
          >
            P: {props.data.createUserID.slice(0, 7)}
          </Badge>
          <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
            {" "}
            {timeStampToString(props.data.createDate.seconds)}
          </Badge>
        </div>
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
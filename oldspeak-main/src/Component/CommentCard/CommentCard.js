import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Badge,
  Button,
  Col,
  Row,
  Container,
} from "reactstrap";
import parse from "html-react-parser";
import classes from "./CommentCard.module.css";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const CommentCard = (props) => {
  //feature image enlarged hook
  const [clicked, setClicked] = useState(false);

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
  return (
    <div>
      <hr className={classes.VerLine} />
      <Container className={classes.CommentCardContainer}>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            {" "}
            <div className={classes.Comment}>
              {props.data.featureImage !== "" ? (
                <div className={classes.ImageContainer}>
                  {clicked ? (
                    <img
                      className={classes.ImageEnlarged}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  ) : (
                    <img
                      className={classes.Image}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  )}
                </div>
              ) : null}

              <div className={classes.CommentMain}>
                {parse(props.data.content)}
              </div>
            </div>
            <div className={classes.Info}>
              {" "}
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
                {" "}
                {timeStampToString(props.data.createDate.seconds)}
              </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CommentCard;

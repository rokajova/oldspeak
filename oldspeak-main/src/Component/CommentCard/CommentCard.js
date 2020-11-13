import React, { useState } from "react";
import { connect } from "react-redux";

import { Badge, Col, Row, Container, Modal, ModalBody } from "reactstrap";
import parse from "html-react-parser";
import classes from "./CommentCard.module.css";
import NewReply from "../NewReply/NewReply";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const CommentCard = (props) => {
  //feature image enlarged hook
  const [featureImageClicked, setFeatureImageClicked] = useState(false);
  //reply modal toggle hook
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  //reply content hook
  const [replyContent, setReplyContent] = useState(props.data.content);
  //reply feature image hook
  const [replyFeatureImage, setReplyFeatureImage] = useState(
    props.data.featureImage
  );
  //reply feature image extension (JSX conditional rendering)
  const [replyFeatureExtension, setReplyFeatureExtension] = useState(
    props.data.featureExtension
  );

  const [replyCreateUserID, setReplyCreateUserID] = useState(
    props.data.createUserID
  );

  const [replyCreateDate, setReplyCreateDate] = useState(props.data.createDate);

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
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  return (
    <div>
      <hr className={classes.VerLine} />
      <Container className={classes.CommentCardContainer}>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <div className={classes.Comment}>
              {props.data.featureImage !== "" ? (
                <div className={classes.ImageContainer}>
                  {featureImageClicked ? (
                    props.data.featureExtension.includes("image") ? (
                      <img
                        className={classes.ImageEnlarged}
                        src={props.data.featureImage}
                        alt={props.data.title}
                        onClick={() => {
                          setFeatureImageClicked(!featureImageClicked);
                        }}
                      />
                    ) : (
                      <video
                        controls
                        className={classes.ImageEnlarged}
                        src={props.data.featureImage}
                        alt={props.data.title}
                        onClick={() => {
                          setFeatureImageClicked(!featureImageClicked);
                        }}
                      />
                    )
                  ) : props.data.featureExtension.includes("image") ? (
                    <img
                      className={classes.Image}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setFeatureImageClicked(!featureImageClicked);
                      }}
                    />
                  ) : (
                    <video
                      className={classes.Image}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setFeatureImageClicked(!featureImageClicked);
                      }}
                    />
                  )}
                </div>
              ) : null}
              {props.data.replyContent || props.data.replyFeatureImage ? (
                <div className={classes.Reply}>
                  {props.data.replyFeatureImage ? (
                    <div>
                      {" "}
                      {props.data.replyFeatureExtension.includes("image") && (
                        <img
                          className={classes.ReplyFeatureImage}
                          src={props.data.replyFeatureImage}
                        />
                      )}
                      {props.data.replyFeatureExtension.includes("video") && (
                        <video
                          controls
                          className={classes.ReplyFeatureImage}
                          src={props.data.replyFeatureImage}
                        />
                      )}
                    </div>
                  ) : null}
                  {props.data.replyContent ? (
                    <div style={{ paddingLeft: "4px", paddingRight: "4px" }}>
                      {parse(props.data.replyContent)}
                    </div>
                  ) : null}
                  <div className={classes.ReplyInfo}>
                    <Badge
                      style={{
                        color: "#3b3b3b",
                        marginRight: 4,
                        borderRadius: 5,
                        backgroundColor: "#F1F3F3",
                      }}
                    >
                      {props.data.replyCreateUserID.slice(0, 7)}
                    </Badge>
                    <Badge
                      style={{
                        color: "#3b3b3b",
                        marginRight: 4,
                        borderRadius: 5,
                        backgroundColor: "#F1F3F3",
                      }}
                    >
                      {timeStampToString(props.data.replyCreateDate.seconds)}
                    </Badge>
                  </div>
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
              {props.auth.isEmpty ? null : (
                <svg
                  className={classes.ReplyButton}
                  viewBox="0 0 16 13"
                  fill="currentColor"
                  onClick={() => {
                    setIsReplyModalOpen(!isReplyModalOpen);
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z"
                  />
                </svg>
              )}
            </div>
            <Modal
              centered
              toggle={() => setIsReplyModalOpen(!isReplyModalOpen)}
              isOpen={isReplyModalOpen}
            >
              <ModalBody
                style={{
                  maxHeight: "calc(100vh - 210px)",
                  overflowY: "auto",
                }}
              >
                <NewReply
                  onReplyToggle={() => setIsReplyModalOpen(!isReplyModalOpen)}
                  replyContent={replyContent}
                  replyFeatureImage={replyFeatureImage}
                  replyFeatureExtension={replyFeatureExtension}
                  replyCreateUserID={replyCreateUserID}
                  replyCreateDate={replyCreateDate}
                />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(CommentCard);

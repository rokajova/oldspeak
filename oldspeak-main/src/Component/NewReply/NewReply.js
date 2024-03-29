import React, { Component } from "react";
import { Container, FormGroup, Input, Alert, Button } from "reactstrap";
import classes from "./NewReply.module.css";
import ReactQuill from "react-quill";
import Recaptcha from "react-recaptcha";

import "react-quill/dist/quill.snow.css";
import firebase from "../../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

// firebase refs
const db = firebase.firestore();
const storageRef = firebase.storage();

// instance for reset recaptcha
let recaptchaInstance;

class NewReply extends Component {
  constructor(props) {
    super(props);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
    this.onChangeCommentContent = this.onChangeCommentContent.bind(this);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null;

    this.state = {
      isModalOpen: false,
      isVerified: false,
      hasFeatureImage: false,
      isImageWarningOpen: false,

      comment: {
        commentID: "",
        content: "",
        createDate: "",
        featureImage: "",
        featureExtension: "",
        createUserID: "",
        replyContent: "",
        replyFeatureExtension: "",
        replyFeatureImage: "",
        replyCreateUserID: "",
        replyCreateDate: "",
      },
    };
  }

  // quill modules & format
  modules = {
    toolbar: {
      container: [
        // [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [
          // [{ list: "ordered" }, { list: "bullet" }],
          "link",
        ],
        // ["code-block"],
      ],
      handlers: {
        image: () => this.quillImageCallBack(),
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  formats = [
    // "header",
    "font",
    // "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    // "blockquote",
    // "list",
    // "bullet",
    // "indent",
    "link",
    // "image",
    // "video",
    // "code-block",
  ];

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  //get quill ref
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  //set article content. If limit reached, delete input
  onChangeCommentContent = (value) => {
    const limit = 10000;
    var quill = this.quillRef;
    quill.on("text-change", function (delta, old, source) {
      if (quill.getLength() > limit) {
        quill.deleteText(limit, quill.getLength());
      }
    });
    this.setState({
      comment: {
        ...this.state.comment,
        content: value,
      },
    });
  };

  //recaptcha verify
  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }

  //recaptcha expired
  expiredCallback() {
    this.setState({
      isVerified: false,
    });
  }

  //add doc to Articles/Comments collection, then redirect to home
  submitComment = () => {
    const aid = window.location.pathname.slice(7);
    this.state.comment.createUserID = firebase.auth().currentUser.uid;

    this.setState(
      {
        isVerified: false,
        hasFeatureImage: false,
        comment: {
          ...this.state.comment,
          createDate: new Date(),
          replyContent: this.props.replyContent,
          replyFeatureImage: this.props.replyFeatureImage,
          replyFeatureExtension: this.props.replyFeatureExtension,
          replyCreateUserID: this.props.replyCreateUserID,
          replyCreateDate: this.props.replyCreateDate,
        },
      },
      () => {
        db.collection("Articles")
          .doc(aid)
          .collection("Comments")
          .add(this.state.comment)
          .then((res) => {})
          .catch((err) => console.log(err));
        this.props.onReplyToggle();
        this.reactQuillRef
          .getEditor()
          .deleteText(0, this.reactQuillRef.getEditor().getLength());
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          comment: {
            ...this.state.comment,
            featureImage: "",
            content: "",
            replyContent: "",
            replyFeatureImage: "",
            replyFeatureExtension: "",
            replyCreateUserID: "",
            replyCreateDate: "",
          },
        });
      }
    );

    //update commentcount by 1 and popularScore by 1^12
    const articleRef = db.collection("Articles").doc(aid);
    articleRef.update({
      popularScore: firebase.firestore.FieldValue.increment(Math.pow(10, 12)),
      commentCount: firebase.firestore.FieldValue.increment(1),
    });
    recaptchaInstance.reset();
  };

  //compress image react quill (disabled)
  fileCompress = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        file: "File",
        quality: 0.5,
        maxWidth: 640,
        maxHeight: 640,
        success(file) {
          return resolve({
            success: true,
            file: file,
          });
        },
        error(err) {
          return resolve({
            success: false,
            message: err.message,
          });
        },
      });
    });
  };

  //delete feature image uploaded to storage under Comments folder(disabled. Storage rules)
  // deleteImageCallBack = (e) => {
  //   const fileName = this.state.comment.featureImage.slice(84, 120);
  //   storageRef
  //     .ref()
  //     .child("Comments/" + fileName)
  //     .delete()
  //     .then(() => {
  //       this.setState({
  //         hasFeatureImage: false,
  //         comment: {
  //           ...this.state.comment,
  //           featureImage: "",
  //         },
  //       });
  //       console.log("file deleted!");
  //     })
  //     .catch(function (error) {
  //       console.log("cannot delete file!");
  //     });
  // };

  //upload feature image to storage under Comments folder
  uploadImageCallBack = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      storageRef
        .ref()
        .child("Comments/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          const downloadURL = await storageRef
            .ref()
            .child("Comments/" + fileName)
            .getDownloadURL();
          const extension = await storageRef
            .ref()
            .child("Comments/" + fileName)
            .getMetadata();
          resolve({
            success: true,
            data: { link: downloadURL, fileExtension: extension.contentType },
          });
        })
        .catch((err) => this.setState({ isImageWarningOpen: true }));
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    //remove html tags ( not all)
    function removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    }

    //submit comment enable conditions
    const submitButtonCondition =
      this.state.isVerified &&
      (removeTags(this.state.comment.content).length >= 1 ||
        this.state.comment.featureImage.length != 0);

    return (
      <Container className={classes.NewCommentMain}>
        <FormGroup>
          <Alert
            style={{
              paddingTop: "none !important",
              fontSize: "14px",
              fontStyle: "italic",
              overflowX: "hidden",
              wordWrap: "break-word",
            }}
            color="warning"
          >
            {" "}
            {this.props.replyFeatureImage ? (
              <div>
                {" "}
                {this.props.replyFeatureExtension.includes("image") && (
                  <img
                    className={classes.ReplyImage}
                    src={this.props.replyFeatureImage}
                  />
                )}
                {this.props.replyFeatureExtension.includes("video") && (
                  <video
                    className={classes.ReplyImage}
                    src={this.props.replyFeatureImage}
                  />
                )}
              </div>
            ) : null}
            {this.props.replyContent.length > 500 ? (
              <div>
                {removeTags(this.props.replyContent.slice(0, 500))}...
                <strong> ({this.props.replyContent.length - 500})</strong>
              </div>
            ) : (
              <div>{removeTags(this.props.replyContent)}</div>
            )}
          </Alert>
          <Input
            type="file"
            accept="image/*,video/*"
            className={classes.ImageUploader}
            onChange={async (e) => {
              const uploadState = await this.uploadImageCallBack(e);
              if (uploadState.success) {
                this.setState({
                  hasFeatureImage: true,
                  comment: {
                    ...this.state.comment,
                    featureImage: uploadState.data.link,
                    featureExtension: uploadState.data.fileExtension,
                  },
                });
                console.log("Feature file uploaded!");
              }
            }}
          ></Input>

          {this.state.hasFeatureImage ? (
            <header className={classes.ImageUploaded}>
              {this.state.comment.featureExtension.includes("image") && (
                <img
                  src={this.state.comment.featureImage}
                  className={classes.FeatureImg}
                />
              )}
              {this.state.comment.featureExtension.includes("video") && (
                <video
                  src={this.state.comment.featureImage}
                  className={classes.FeatureImg}
                />
              )}
            </header>
          ) : (
            ""
          )}
        </FormGroup>{" "}
        <Alert
          isOpen={this.state.isImageWarningOpen}
          toggle={() => this.setState({ isImageWarningOpen: false })}
          color="warning"
        >
          File too large! Must be {">"}10MB
        </Alert>
        <FormGroup style={{ overflow: "inherit", backgroundColor: "white" }}>
          <ReactQuill
            ref={(el) => (this.reactQuillRef = el)}
            value={this.state.comment.content}
            onChange={(e) => this.onChangeCommentContent(e)}
            placeholder="Content..."
            theme="snow"
            modules={this.modules}
            formats={this.formats}
          />
        </FormGroup>
        <FormGroup>
          <Recaptcha
            ref={(e) => (recaptchaInstance = e)}
            sitekey="6LfQK9UZAAAAAODZDdplETwm5QlS7KwFzsSyoKFz"
            render="explicit"
            verifyCallback={this.verifyCallback}
            expiredCallback={this.expiredCallback}
          />
        </FormGroup>{" "}
        <FormGroup>
          {!submitButtonCondition ? (
            <Button
              style={{
                borderRadius: 0,
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
              color="dark"
              disabled
            >
              {" "}
              <strong>SUBMIT</strong>
            </Button>
          ) : (
            <Button
              style={{
                borderRadius: 0,
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
              color="success"
              onClick={(e) => this.submitComment()}
            >
              {" "}
              <strong>SUBMIT</strong>
            </Button>
          )}
          <Button
            style={{
              borderRadius: 0,
              float: "right",
              backgroundColor: "#B34831",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
            color="danger"
            onClick={(e) => this.props.onReplyToggle()}
          >
            {" "}
            CANCEL
          </Button>
        </FormGroup>
        {/* componentdidmount attaches refs, need this ghost element to render */}
        <ReactQuill
          className={classes.TextEditor}
          ref={(el) => (this.reactQuillRef = el)}
        />
      </Container>
    );
  }
}
// private repo commit test

export default NewReply;

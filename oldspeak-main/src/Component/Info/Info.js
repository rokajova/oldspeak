import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import classes from "./Info.module.css";

const Info = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs fixed="top" style={{ textAlign: "center" }}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Rules
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            News
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className={classes.ModalInfoContent}>
                <h4
                  style={{
                    borderBottom: "1px solid silver",
                    textAlign: "center",
                  }}
                >
                  What is this?
                </h4>
                <p style={{ margin: "4px" }}>
                  A website with a mission to help reduce the increasing spread
                  of misinformation on the internet.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <h4
                  style={{
                    borderBottom: "1px solid silver",
                    textAlign: "center",
                  }}
                >
                  How does it work?
                </h4>
                <p style={{ margin: "4px" }}>
                  Users can create a unique name by pressing{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    CREATE NAME
                  </mark>{" "}
                  in the header. Once a name is created, users can
                  read/create/comment/rate thinks.
                </p>
              </div>

              <div className={classes.ModalInfoContent}>
                <h4
                  style={{
                    borderBottom: "1px solid silver",
                    textAlign: "center",
                  }}
                >
                  How to create/comment/rate thinks?
                </h4>
                <p style={{ margin: "4px" }}>
                  In order to{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    CREATE THINK
                  </mark>{" "}
                  , it must have:{" "}
                  <ul>
                    <li>A feature image</li>
                    <li>A title</li>
                    <li>Content</li>
                    <li>Completed ReCaptcha</li>
                  </ul>{" "}
                  In order to{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    CREATE COMMENT
                  </mark>{" "}
                  ,it must have:{" "}
                  <ul>
                    <li>A feature image OR content</li>
                    <li>Completed ReCaptcha</li>
                  </ul>{" "}
                  In order to rate, choose your rating ({" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    GOOD
                  </mark>{" "}
                  /{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    BAD
                  </mark>{" "}
                  ) under a think.
                </p>
              </div>
              <div className={classes.ModalInfoContent}>
                <h4
                  style={{
                    borderBottom: "1px solid silver",
                    textAlign: "center",
                  }}
                >
                  How does the rating system work?
                </h4>
                <p style={{ margin: "4px" }}>
                  For example, if a think is rated{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    GOOD
                  </mark>{" "}
                  7 times, and{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    BAD
                  </mark>{" "}
                  3 times, the rating score would be 70%. Rating score is
                  visible as a progress bar and a badge under a think. A unique
                  name may only rate a think once. Rating is strongly encouraged
                  because it helps to measure a thinks quality.
                </p>
              </div>
              <div className={classes.ModalInfoContent}>
                <h4
                  style={{
                    borderBottom: "1px solid silver",
                    textAlign: "center",
                  }}
                >
                  What are the rules?
                </h4>
                <p style={{ margin: "4px" }}>
                  Find out about the rules under the{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                      color: "blue",
                    }}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Rules
                  </mark>{" "}
                  tab.
                </p>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>1.</strong> By using this website, you agree to all
                  the rules stated in this section.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>2.</strong> You will <strong>immediately</strong> stop
                  using this website if you are under the age of 18.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>3.</strong> Do not upload image/video/text content
                  that is illegal or breaks any global or local laws.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>4.</strong> Legal NSFW content is allowed and will not
                  be removed.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>5.</strong> Do not upload any content containing,
                  <strong> in any shape or form</strong>, child pornography, any
                  content of minors under the age of 18 shown as being naked or
                  engaging in sexual acts.
                </p>{" "}
              </div>

              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>6.</strong> Do not upload personal information of any
                  person or company for malicious intent ("doxing").
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>7.</strong> Do not spam or flood the website.
                </p>{" "}
              </div>
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>8.</strong> If you found a bug or an exploit for this
                  website, please contact me{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    contact@oldspeak.me
                  </mark>{" "}
                  .
                </p>{" "}
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              {" "}
              <div className={classes.ModalNewsContent}>
                <h4
                  style={{
                    position: "relative",
                    borderBottom: "1px solid silver",
                    paddingLeft: "4px",
                  }}
                >
                  <strong>Content sorting.</strong>
                  <i
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      fontSize: "14px",
                      color: "gray",
                      paddingRight: "2px",
                    }}
                  >
                    December 2nd, 2020
                  </i>
                </h4>{" "}
                <p style={{ margin: "4px" }}>
                  It's finally winter and with it also comes some updates!
                  <br />I have finally added a sorting system. Now you can sort
                  thinks by pressing{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    NEW
                  </mark>{" "}
                  or{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    POPULAR
                  </mark>{" "}
                  buttons located on the top of the main page. I was trying to
                  figure out how to determine a thinks popularity and with some
                  attribute tinkering I think I have found an optimal way to do
                  that. The way the popularity is calculated may change in the
                  future if more features are added.
                </p>{" "}
              </div>
              <div className={classes.ModalNewsContent}>
                <h4
                  style={{
                    position: "relative",
                    borderBottom: "1px solid silver",
                    paddingLeft: "4px",
                  }}
                >
                  <strong>Guest browsing.</strong>
                  <i
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      fontSize: "14px",
                      color: "gray",
                      paddingRight: "2px",
                    }}
                  >
                    November 11th, 2020
                  </i>
                </h4>{" "}
                <p style={{ margin: "4px" }}>
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    CREATE NAME
                  </mark>{" "}
                  is no longer needed in order to read thinks and comments.
                  Users can now freely use the website as guests. This solves an
                  issue where new users could not view thinks they were linked
                  to, as they we redirected to home page. However, creating
                  thinks, commenting and rating still requires to{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    CREATE NAME
                  </mark>{" "}
                  . <br />
                  Also, I've added extra security features and improved overall
                  readability.
                </p>{" "}
              </div>
              <div className={classes.ModalNewsContent}>
                <h4
                  style={{
                    position: "relative",
                    borderBottom: "1px solid silver",
                    paddingLeft: "4px",
                  }}
                >
                  <strong>Replies.</strong>
                  <i
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      fontSize: "14px",
                      color: "gray",
                      paddingRight: "2px",
                    }}
                  >
                    November 1st, 2020
                  </i>
                </h4>{" "}
                <p style={{ margin: "4px" }}>
                  Added a simple reply system. Just click{" "}
                  <svg viewBox="0 0 16 16" fill="currentColor" width="2em">
                    <path
                      fill-rule="evenodd"
                      d="M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z"
                    />
                  </svg>
                  under a comment to post a reply.
                </p>{" "}
              </div>
              <div className={classes.ModalNewsContent}>
                <h4
                  style={{
                    position: "relative",
                    borderBottom: "1px solid silver",
                    paddingLeft: "4px",
                  }}
                >
                  <strong>Video support in thinks and comments.</strong>
                  <i
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      fontSize: "14px",
                      color: "gray",
                      paddingRight: "2px",
                    }}
                  >
                    October 28th, 2020
                  </i>
                </h4>{" "}
                <p style={{ margin: "4px" }}>
                  As promised in{" "}
                  <a
                    href="https://oldspeak.me/think/bzv0l6ybumgalfkbHjPX"
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                      color: "blue",
                    }}
                  >
                    this think
                  </a>
                  , I have been working on adding new features to the website.
                  I'm happy to announce that from today you can upload videos
                  aswell as images! Keep in mind that although most video
                  formats are acceptable, the maximum file size of both image or
                  video files may not be greater than 10MB. This limitation is a
                  subject to change if I see a demand for larger files.
                  <br /> Also I made some minor quality of life changes to
                  improve the usability of the website. More updates are coming
                  so stay tuned and thank you!{" "}
                </p>{" "}
              </div>
              <div className={classes.ModalNewsContent}>
                <h4
                  style={{
                    position: "relative",
                    borderBottom: "1px solid silver",
                    paddingLeft: "4px",
                  }}
                >
                  <strong> Oldspeak.me launch! </strong>
                  <i
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      fontSize: "14px",
                      color: "gray",
                      paddingRight: "2px",
                    }}
                  >
                    October 21st, 2020
                  </i>
                </h4>{" "}
                <p style={{ margin: "4px" }}>
                  Welcome! However you found this website, I was waiting for you
                  and I'm glad you've made it. Please check out the{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                      color: "blue",
                    }}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    FAQ
                  </mark>{" "}
                  and{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                      color: "blue",
                    }}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Rules
                  </mark>{" "}
                  if you have any questions.
                  <br />I am still working on the website and always looking to
                  add new features whenever I can. This is far from a finished
                  product, at least in my eyes. I am also always open to
                  suggestions as to how to improve this website so if you have
                  any ideas, just contact me{" "}
                  <mark
                    style={{
                      backgroundColor: "#d2d9d9",
                      fontFamily: "monospace",
                    }}
                  >
                    contact@oldspeak.me
                  </mark>{" "}
                  . Thank you for using this website!
                </p>{" "}
              </div>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Info;

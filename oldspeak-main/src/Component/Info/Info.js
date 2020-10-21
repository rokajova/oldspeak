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
                  A website created to help reduce the increasing spread of
                  misinformation on the internet.
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
                  visible as a progress bar and a badge under a tink. A unique
                  name may only rate a think once!
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
                  <strong> in any shape or form</strong>, child pornography or
                  any content of minors under the age of 18 engaging in sexual
                  acts.
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
                  <strong>8.</strong> If you find an exploit for this website,
                  please contact me{" "}
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
              <div className={classes.ModalInfoContent}>
                <p style={{ margin: "4px" }}>
                  <strong>October ??, 2020.</strong> <br />
                  Website launch.
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

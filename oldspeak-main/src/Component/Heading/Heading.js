import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Info from "../Info/Info";
import classes from "./Heading.module.css";
import { connect } from "react-redux";
import firebase from "../../Config/firebase";
import NewArticle from "../NewArticle/NewArticle";

class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isInfoOpen: false,
      isNewArticleOpen: false,
    };
  }

  //react-blog-server folder
  componentWillReceiveProps(nextProps, nextContext) {
    if (!nextProps.auth.isEmpty) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((claim) => {
          console.log("auth success!");
        });
    }
  }
  handleClick = (isNewArticleOpen) => {
    this.setState({ isNewArticleOpen: !this.state.isNewArticleOpen });
  };

  login = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInAnonymously();
      });
  };

  render() {
    return (
      <div>
        {this.props.auth.isLoaded && (
          <Navbar className={classes.Navbar} expand="xs" fixed="top">
            <NavbarBrand style={{ marginRight: 0 }} href="/">
              {" "}
              <img
                className={classes.Logo}
                src="https://firebasestorage.googleapis.com/v0/b/oldspeak-56bd3.appspot.com/o/Logo.png?alt=media&token=19be2e08-aeb8-43b7-8f20-55e7665768b7"
              />
            </NavbarBrand>
            <Nav navbar>
              {this.props.auth.isEmpty ? (
                <NavItem>
                  <Button
                    style={{ borderRadius: 0, fontFamily: "monospace" }}
                    outline
                    color="dark"
                    size="sm"
                    onClick={() => this.login()}
                  >
                    <strong>CREATE NAME</strong>
                  </Button>
                </NavItem>
              ) : (
                <NavItem>
                  <Button
                    style={{
                      borderRadius: 0,
                      fontFamily: "monospace",
                    }}
                    outline
                    color="dark"
                    size="sm"
                    onClick={() =>
                      this.setState({
                        isNewArticleOpen: !this.state.isNewArticleOpen,
                      })
                    }
                  >
                    <strong>CREATE THINK</strong>
                  </Button>
                </NavItem>
              )}
            </Nav>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <NavItem>
                  {" "}
                  <Button
                    style={{
                      borderRadius: 0,
                      fontFamily: "monospace",
                    }}
                    outline
                    color="dark"
                    size="sm"
                    onClick={() => this.setState({ isInfoOpen: true })}
                  >
                    <strong>INFO</strong>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        )}
        <Modal
          className={classes.ModalInfo}
          size="lg"
          toggle={() => this.setState({ isInfoOpen: !this.state.isInfoOpen })}
          centered="true"
          isOpen={this.state.isInfoOpen}
        >
          <ModalBody
            className={classes.ModalInfoBody}
            style={{
              backgroundColor: "#e9ecec",
              padding: "4px",
              borderTopLeftRadius: "0.3rem",
              borderTopRightRadius: "0.3rem",
            }}
          >
            <Info />
          </ModalBody>
          <ModalFooter
            style={{ padding: "0.5rem", backgroundColor: "#e9ecec" }}
          >
            <strong style={{ fontFamily: "monospace", fontSize: "16px" }}>
              contact@oldspeak.me
            </strong>
            <Button
              onClick={() =>
                this.setState({ isInfoOpen: !this.state.isInfoOpen })
              }
              style={{
                borderRadius: 0,
                float: "right",
                backgroundColor: "#B34831",
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
              color="danger"
              className="ml-auto"
            >
              <strong>CLOSE</strong>{" "}
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          centered
          toggle={() =>
            this.setState({ isNewArticleOpen: !this.state.isNewArticleOpen })
          }
          isOpen={this.state.isNewArticleOpen}
        >
          <ModalBody
            style={{ backgroundColor: "#e9ecec", borderRadius: "0.3rem" }}
          >
            <NewArticle
              isNewArticleOpen={this.state.isNewArticleOpen}
              onArticleToggle={this.handleClick}
              uid={this.props.auth.uid}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Heading);

import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import ArticleCard from "../ArticleCard/ArticleCard";
import firebase from "../../Config/firebase";
import classes from "./Main.module.css";

//firebase ref
const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      articles: [],
      limit: 5,
      lastArticle: null,
      orderBy: "createDate",
      buttonDisabled: false,
    };
  }

  //get next article after last rendered ordered by createdate, update article array in state
  //set state for lastArticle to be the last article in the articles array
  //limit is 1
  nextArticle = () => {
    let last = this.state.lastArticle;
    this.setState({ buttonDisabled: true });
    db.collection("Articles")
      .orderBy(this.state.orderBy, "desc")
      .startAfter(last.createDate)
      .limit(1)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          var last = this.state.articles[this.state.articles.length - 1];
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });

          let updated_articles = this.state.articles.concat(allArticles);
          this.setState(
            {
              articles: updated_articles,
            },
            () => {
              this.setState({
                buttonDisabled: false,
                isLoaded: true,
                lastArticle: this.state.articles[
                  this.state.articles.length - 1
                ],
              });
            }
          );
        }
        window.scrollTo(0, document.body.scrollHeight);
      });
  };

  componentDidMount() {
    this.getMyArticles();
  }

  //referencing Articles, ordering by createDate. Populate comments array with articles from db
  //limit is in state
  getMyArticles = () => {
    db.collection("Articles")
      .orderBy(this.state.orderBy, "desc")
      .limit(this.state.limit)
      .onSnapshot((docs) => {
        if (!docs.empty) {
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });
          this.setState(
            {
              articles: allArticles,
            },
            () => {
              this.setState({
                isLoaded: true,
                lastArticle: this.state.articles[
                  this.state.articles.length - 1
                ],
              });
            }
          );
        }
      });
  };

  render() {
    return (
      //rendering every element in articles array in state
      <Container className={classes.Main}>
        {this.state.isLoaded
          ? this.state.articles.map((article, index) => {
              return <ArticleCard key={index} data={article} />;
            })
          : ""}
        <div className={classes.MoreButton}>
          {" "}
          {this.state.buttonDisabled ? (
            <Button
              size="sm"
              outline
              color="dark"
              style={{ borderRadius: 0 }}
              disabled
            >
              Show 1 more...
            </Button>
          ) : (
            <Button
              size="sm"
              outline
              color="dark"
              style={{ borderRadius: 0 }}
              onClick={() => this.nextArticle()}
            >
              Show 1 more...
            </Button>
          )}
        </div>
      </Container>
    );
  }
}

export default Main;
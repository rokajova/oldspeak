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
      limit: 15,
      lastArticle: null,
      orderBy: "createDate",
      buttonDisabled: false,
    };
  }

  //get next article after last rendered ordered by createdate, update article array in state
  //set state for lastArticle to be the last article in the articles array
  //limit is 1
  nextArticle = () => {
    // if comment count is 0, sort it by newest
    let last;

    if (this.state.orderBy == "createDate") {
      last = this.state.lastArticle.createDate;
      this.setState({ buttonDisabled: true });
      db.collection("Articles")
        .orderBy(this.state.orderBy, "desc")
        .startAfter(last)
        .limit(1)
        .get()
        .then((docs) => {
          if (!docs.empty) {
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
    } else if (this.state.orderBy == "commentCount") {
      last = this.state.lastArticle.commentCount;
      this.setState({ buttonDisabled: true });
      db.collection("Articles")
        .orderBy(this.state.orderBy, "desc")
        .orderBy("createDate", "desc")
        .startAfter(last)
        .limit(1)
        .get()
        .then((docs) => {
          if (!docs.empty) {
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
    }
  };

  //get limit ammount of articles, ordered by orderBy in state
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
        <Button
          onClick={() =>
            this.setState(
              { orderBy: "commentCount", buttonDisabled: false },
              () => this.getMyArticles()
            )
          }
        >
          Popular
        </Button>
        <Button
          onClick={() =>
            this.setState(
              { orderBy: "createDate", buttonDisabled: false },
              () => this.getMyArticles()
            )
          }
        >
          Newest
        </Button>
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
              color="dark"
              style={{
                borderRadius: 0,
                fontFamily: "monospace",
              }}
              disabled
            >
              <strong>SHOW 1 MORE...</strong>
            </Button>
          ) : (
            <Button
              color="dark"
              style={{
                borderRadius: 0,
                fontFamily: "monospace",
              }}
              onClick={() => this.nextArticle()}
            >
              <strong>SHOW 1 MORE...</strong>
            </Button>
          )}
        </div>
      </Container>
    );
  }
}

export default Main;

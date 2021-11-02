import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=f83635c0218c4186aa05e219b086187c";
    let data = await fetch(url);
    let parasdData = await data.json();
    this.setState({ articles: parasdData.articles });
  }

  render() {
    return (
      <>
        <div className="container my-3 mx-3">
          <h1>NewsToday -Top Headlines</h1>

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description
                        : ""
                    }
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2021/11/download-34.jpg?fit=1200%2C675&ssl=1"
                    }
                    newsurl={element.url ? element.url : "/"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default News;

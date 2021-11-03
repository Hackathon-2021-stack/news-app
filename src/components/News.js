import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "stranger",
    pageSize: "15",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    // pageSize: PropTypes.string,
    category: PropTypes.string,
  };

  cap = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsToday -${this.cap(this.props.category)}`;
  }

  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652110fa7d9843f7baaa696f046f4157&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(20)
    this.setState({ loading: true });
    this.props.setProgress(40)
    let data = await fetch(url);
    this.props.setProgress(50)
    let parasdData = await data.json();
    this.props.setProgress(90)
    this.setState({
      articles: parasdData.articles,
      totalResults: parasdData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }


  fetchMoreData = async () => {
    this.props.setProgress(10)
    this.setState({
      page: this.state.page + 1,
    });
    this.props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652110fa7d9843f7baaa696f046f4157&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(40)
    this.setState({ loading: false });
    this.props.setProgress(50)
    let data = await fetch(url);
    this.props.setProgress(70)
    let parasdData = await data.json();
    this.props.setProgress(80)
    this.setState({
      articles: this.state.articles.concat(parasdData.articles),
      totalResults: parasdData.totalResults
    });
    this.props.setProgress(100)
  };

  render() {
    return (
      <>
          <h1 className="text-center" style={{ margin: "25px 0px" }}>
            NewsToday -Top {this.cap(this.props.category)} Headlines
          </h1>
          {this.state.loading&&<Spinner/>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className='container'>
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <Newsitem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageurl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2021/11/download-34.jpg?fit=1200%2C675&ssl=1"
                        }
                        newsurl={element.url ? element.url : "/"}
                        publishedAt={element.publishedAt}
                        author={!element.author ? "Unknown" : element.author}
                        source={
                          !element.source.name ? "Unknown" : element.source.name
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
      </>
    );
  }
}

export default News;

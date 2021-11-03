import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country: 'stranger',
    pageSize: '15',
    category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    // pageSize: PropTypes.string,
    category: PropTypes.string,
  }

  cap=(word)=>{
    return word.charAt(0).toUpperCase()+word.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title=`NewsToday -${this.cap(this.props.category)}`
  }

  

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f83635c0218c4186aa05e219b086187c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parasdData = await data.json();
    this.setState({ articles: parasdData.articles, totalResults: parasdData.totalResults, loading: false});
  }

   handlePreviousClick=async()=>{
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f83635c0218c4186aa05e219b086187c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({loading: true})
    let parasdData = await data.json();
    this.setState({ articles: parasdData.articles });
    this.setState({
      page: this.state.page-1,
      articles: parasdData.articles,
      loading: false
    }
    )
  }

   handleNextClick=async()=>{
     if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f83635c0218c4186aa05e219b086187c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parasdData = await data.json();
    this.setState({ articles: parasdData.articles });
    this.setState({
      page: this.state.page+1,
      articles: parasdData.articles,
      loading: false
    })}
  }
  
  render() {
    return (
      <>
        <div className="container my-3 mx-3">
          <h1 className='text-center' style={{margin:'25px 0px'}}>NewsToday -Top {this.cap(this.props.category)} Headlines</h1>
          {this.state.loading&&<Spinner/>}

          <div className="row">
            {!this.state.loading&& this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2021/11/download-34.jpg?fit=1200%2C675&ssl=1"
                    }
                    newsurl={element.url ? element.url : "/"}
                    publishedAt={element.publishedAt}
                    author={!element.author?'Unknown':element.author}
                    source={!element.source.name?'Unknown':element.source.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="components d-flex justify-content-around">
          <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button type="button" disabled className="btn btn-outline-dark">{this.state.page}</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </>
    );
  }
}

export default News;

import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const cap = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=652110fa7d9843f7baaa696f046f4157&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(20);
    setloading({ loading: true });
    props.setProgress(40);
    let data = await fetch(url);
    props.setProgress(50);
    let parasdData = await data.json();
    props.setProgress(70);
    setarticles(parasdData.articles);
    props.setProgress(80);
    settotalResults(parasdData.totalResults);
    props.setProgress(90);
    setloading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `NewsToday -${cap(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    props.setProgress(10);
    setpage(page + 1);
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=652110fa7d9843f7baaa696f046f4157&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    props.setProgress(40);
    setloading(false);
    props.setProgress(50);
    let data = await fetch(url);
    props.setProgress(70);
    let parasdData = await data.json();
    props.setProgress(80);
    setarticles(articles.concat(parasdData.articles));
    settotalResults(parasdData.totalResults);
    props.setProgress(100);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "70px" }}>
        NewsToday -Top {cap(props.category)} Headlines
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
};

News.defaultProps = {
  country: "stranger",
  pageSize: "15",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  // pageSize: PropTypes.string,
  category: PropTypes.string,
};

export default News;

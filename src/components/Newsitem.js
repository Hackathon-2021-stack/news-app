import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, publishedAt,source } =
      this.props;
    return (
      <>
        <div className="my-3 text-center">
          <div className="card">
            <span style={{zIndex: '2', left: '90%'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
              {source}
            </span>
            <img src={imageurl} className="card-img-top" alt="..." />
            <div className="card-body ">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {author} On {new Date(publishedAt).toGMTString()}
                </small>
              </p>
              <a
                href={newsurl}
                target="break"
                className="btn btn-primary btn-sm "
                rel="noreferrer"
              >
                Red More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Newsitem;

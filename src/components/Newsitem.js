import React from "react";

const Newsitem = (props) => {
  let { title, description, imageurl, newsurl, author, publishedAt, source } =
    props;
  return (
    <>
      <div className="my-3 ">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0px",
            }}
          >
            <span
              style={{ zIndex: "2", left: "90%" }}
              className="badge  bg-danger"
            >
              {source}
            </span>
          </div>
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
};

export default Newsitem;

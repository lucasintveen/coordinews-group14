import React, { Component } from "react";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    const url =
      `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=` +
      process.env.REACT_APP_BBCAPI;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          news: data.articles,
        });
      })
      .catch((error) => console.log(error));
  }

  renderItem() {
    // Top 5 Articles are rendered only, as the objective is to provide only a short overview
    if (this.state.news) {
      console.log("Test worked");
      return this.state.news.slice(0, 5).map((item) => (
        <div className="form-inputs">
          <a target="_blank" href={item.url} rel="noreferrer">
            <input
              className="form-input-api"
              type="text"
              name="title"
              defaultValue={item.title}
            />
          </a>
        </div>
      ));
    } else {
      console.log("Schade");
    }
  }
  render() {
    return <form className="form-api1">{this.renderItem()}</form>;
  }
}

export default News;

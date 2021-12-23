import React, { useState, Component } from "react";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=04d6ef3afc214bf5a94913550e4183e2`;

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
    return this.state.news.slice(0, 5).map((item) => (
      <div className="form-inputs">
        <a href={item.url}>
          <input
            className="form-input-api"
            type="text"
            name="title"
            defaultValue={item.title}
          />
        </a>
      </div>
    ));
  }
  render() {
    return <form className="form-api1">{this.renderItem()}</form>;
  }
}

export default News;

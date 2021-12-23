import React, { useState, Component } from "react";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gBng9EwOai9DK8aeJDPUJ1jwnd3xYf5N`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("NY Data: ", data.results);
        this.setState({
          news: data.results,
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
    return <form className="form-api2">{this.renderItem()}</form>;
  }
}

export default News;

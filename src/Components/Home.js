import React, { useState } from "react";
import "../CSS/Form.css";
import { getArticles } from "../DatabaseInteraction/db";
import AddIdea from "./AddArticle";
import ArticleId from "./ArticleId";
import IdeaId from "./IdeaId";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import Parse from "parse";
import HomeArt from "./HomeArt";
import HomeMes from "./HomeMes";

const Home = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const [childData, setChildData] = useState("");
  console.log("Child Data: ", childData);
  console.log("Id: ", childData[0]);

  return (
    <>
      <div className="form-container-home">
        <span className="Id--expiration">
          Hey {Parse.User.current().attributes.username}, these article await
          you today:
        </span>

        <span className="home-mes-head">
          Furthermore, please respond to these task requests:
        </span>
        <div className="form-content-left-home">
          {
            <>
              <HomeArt /> <HomeMes />
            </>
          }
        </div>
        <div className="form-content-right-home">
          <h1>Hello</h1>
        </div>
      </div>
    </>
  );
};

export default Home;

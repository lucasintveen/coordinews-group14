import React, { useState } from "react";
import "../CSS/Form.css";
import { getArticles } from "../DatabaseInteraction/db";
import AddIdea from "./AddArticle";
import ArticleId from "./ArticleId";
import FormSuccess from "./FormSuccess";
import Idea from "../Images/Bulb.png";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import News from "../Images/News.png";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const formTypeArticle = true;

  const [childData, setChildData] = useState("");

  return (
    <>
      <div className="form-container">
        {!isSubmitted ? (
          <span className="trash-btn">
            <FaTrash onClick={deleteArticle() && submitForm()} />
            <FaShareAlt />
          </span>
        ) : (
          <span className="trash-btn">
            <FaArrowLeft />
          </span>
        )}

        <span className="Id--expiration">Article ID: {childData[0]}</span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="idea icon" />
        </div>
        {!isSubmitted ? (
          <ArticleId passChildData={setChildData} />
        ) : (
          <FormSuccess formType={formTypeArticle} />
        )}
      </div>
    </>
  );
};

export default Form;

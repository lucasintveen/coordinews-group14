import React, { useState } from "react";
import "../CSS/Form.css";
import ArticleId from "./ArticleID";
import FormSuccess from "./FormSuccess";
import { FaArrowLeft } from "react-icons/fa";
import News from "../Images/News.png";
import FormDeletion from "./FormDeletion";

export default function ArticleForm() {
  const [isDeleter, setIsDeleter] = useState(false);
  const [submitter, setSubmitter] = useState(false);
  const formTypeArticle = true;
  const [childData, setChildData] = useState("");
  const passedArticleId = childData[0];
  const article = "article";

  return (
    <>
      <div className="form-container">
        {submitter ? (
          <span className="trash-btn">
            <FaArrowLeft />
          </span>
        ) : null}

        <span className="Id--expiration">Article ID: {passedArticleId}</span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="idea icon" />
        </div>
        {isDeleter ? (
          <FormDeletion
            formType={formTypeArticle}
            submitter={setSubmitter}
            articleId={passedArticleId}
            isDeleter={setIsDeleter}
          />
        ) : submitter ? (
          <>
            <FormSuccess formType={formTypeArticle} state={article} />
          </>
        ) : (
          <ArticleId
            passChildData={setChildData}
            isDeleter={setIsDeleter}
            submitter={submitter}
          />
        )}
      </div>
    </>
  );
}

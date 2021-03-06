import React, { useState } from "react";
import IdeaId from "./IdeaID";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";

export default function IdeaToArticleConversion() {
  const [childData, setChildData] = useState("");
  const [submitter, setSubmitter] = useState();
  const idea = "idea";

  return (
    <>
      <div className="form-container">
        <span className="Id--expiration">
          Idea ID: {childData[0]} <br /> Expires: {childData[1]}
        </span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="news icon" />
        </div>
        {!submitter ? (
          <IdeaId passChildData={setChildData} submit={setSubmitter} />
        ) : (
          <FormSuccess state={idea} submit={setSubmitter} />
        )}
      </div>
    </>
  );
}

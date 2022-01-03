import React, { useState } from "react";
import "../CSS/Form.css";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";
import IdeaAddition from "./IdeaAddition";

export default function IdeaAdditionForm() {
  const [childData, setChildData] = useState("");
  const submitter = childData;
  const typeIdea = true;

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={News} alt="news icon" />
        </div>
        {!submitter ? (
          <IdeaAddition passChildData={setChildData} />
        ) : (
          <FormSuccess submit={setChildData} formTypeIdea={typeIdea} />
        )}
      </div>
    </>
  );
}

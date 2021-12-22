import React from "react";
import Start from "../Images/Start.png";
import "../CSS/Form.css";

const FormSuccess = (props) => {
  return (
    <div className="form-content-right">
      {!props.formTypeArticle ? (
        <h1 className="form-success">
          You have successfully deleted the article.
        </h1>
      ) : (
        <h1 className="form-success">TEST 123</h1>
      )}
    </div>
  );
};

export default FormSuccess;

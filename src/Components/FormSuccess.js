import React from "react";
import "../CSS/Form.css";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default FormSuccess(props) {
  function submit() {
    props.submit(false);
  }

  return (
    <>
      <div className="form-content-right">
        <a href="/#/ideas">
          <span className="arrow-btn" href="/">
            <FaLongArrowAltLeft onClick={submit} />
          </span>
        </a>
        {!props.formTypeArticle ? (
          <h1 className="form-success">
            You have successfully deleted the article.
          </h1>
        ) : (
          <h1 className="form-success">TEST 123</h1>
        )}
      </div>
    </>
  );
};

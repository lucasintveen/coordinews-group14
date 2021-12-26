import Articletable from "./ArticleTable";
import "../App.css";

export default function Articles() {
  return (
    <>
      <div className="background--box">
        <p className="overview--header">Article Overview</p>

        <br></br>
        <Articletable />
        <a href="/#/addIdea">
          <button type="submit" className="form--button">
            Add Idea
          </button>
        </a>
      </div>
    </>
  );
}

/* Change dropdown actions - database. Line 28-53 
  same goes for Current and Archive. Line 57 and 58
*/

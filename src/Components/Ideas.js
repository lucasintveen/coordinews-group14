import IdeaTable from "./IdeaTable";
import "../App.css";

export default function Articles() {
  return (
    <>
      <div className="background--box">
        <p className="overview--header">Article Overview</p>

        <br></br>
        <IdeaTable />
        <a href="/#/addIdea">
          <button type="submit" className="form--button">
            Add Idea
          </button>
        </a>
      </div>
    </>
  );
}

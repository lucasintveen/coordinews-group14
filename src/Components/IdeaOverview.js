import IdeaTable from "./IdeaTable";
import "../App.css";
import "../CSS/Form.css";

export default function IdeaOverview() {
  return (
    <>
      <div className="form-container1">
        <br></br>
        <IdeaTable />
        <a href="/#/ideaAddition">
          <button type="submit" className="form--button--idea">
            Add Idea
          </button>
        </a>
      </div>
    </>
  );
}

import IdeaTable from "./IdeaTable";
import "../App.css";
import "../CSS/Form.css";

export default function Ideas() {
  return (
    <>
      <div className="form-container1">
        <br></br>
        <IdeaTable />
        <a href="/#/addIdea">
          <button type="submit" className="form--button--idea">
            Add Idea
          </button>
        </a>
      </div>
    </>
  );
}

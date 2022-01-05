import Articletable from "../Components/ArticleTable";
import "../CSS/Form.css";

//Decision for own component, as further functionality could be included
export default function ArticleOverview() {
  return (
    <>
      <div className="form-container1">
        <br></br>
        <Articletable />
      </div>
    </>
  );
}

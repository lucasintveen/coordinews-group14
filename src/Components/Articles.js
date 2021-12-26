import Articletable from "./ArticleTable";
import "../App.css";

export default function Articles() {
  return (
    <>
      <div className="background--box">
        <p className="overview--header">Article Overview</p>

        <br></br>
        <Articletable />
      </div>
    </>
  );
}

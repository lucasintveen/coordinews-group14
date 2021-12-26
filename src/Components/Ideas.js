import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import IdeaTable from "./IdeaTable";
import IdeaId from "./IdeaId";
import { Link } from "react-router-dom";
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
            Add Article
          </button>
        </a>
      </div>
    </>
  );
}

/* Change dropdown actions - database. Line 28-53 
  same goes for Current and Archive. Line 57 and 58
*/

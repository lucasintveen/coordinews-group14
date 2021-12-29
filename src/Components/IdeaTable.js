import { getIdeas, getIdeasRefactored } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ideaSearch from "./IdeaSearch";

export default function IdeaTable() {
  const [Ideas, setIdeas] = useState();
  const [search, setSearch] = useState("");
  const [section, setSection] = useState({});
  const [date, setDate] = useState();
  const searchOperator = (event) => {
    setSearch(event.target.value);
  };
  var today = new Date();
  var dateToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  function currentNewspaper() {
    if (date === undefined) {
      setDate(dateToday);
    } else {
      setDate();
    }
  }

  async function getIdeasFromDb() {
    const Ideas = await getIdeasRefactored();
    setIdeas(Ideas.ideasMapped);
  }
  useEffect(() => {
    getIdeasFromDb();
  }, []);
  if (!Ideas) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const filteredIdeas = ideaSearch(Ideas, search, section, date);
  const rowLengthUnfiltered = Ideas.length;
  const Section = [];
  const Source = [];
  const Photographer = [];
  for (let i = 0; i < rowLengthUnfiltered; i++) {
    Section.push(Ideas[i].Section);
    Source.push(Ideas[i].Source);
    Photographer.push(Ideas[i].Photographer);
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function handleSection(event) {
    setSection({
      [event.target.name]: event.target.value,
    });
  }
  var distinctSection = Section.filter(onlyUnique);
  var distinctSource = Source.filter(onlyUnique);

  return (
    <>
      <ul className="form--list">
        <li className="form--row--article">
          <input
            type="text"
            onChange={searchOperator}
            placeholder="Search Titles"
          />

          <select
            name="section"
            value={section.section}
            onChange={handleSection}
          >
            <option value="" selected disabled hidden>
              Please Select Here
            </option>

            {Array.from({ length: distinctSection.length }).map((_, index) => (
              <option>{distinctSection[index]}</option>
            ))}
            <option></option>
          </select>
          <select name="Source" value={section.Source} onChange={handleSection}>
            <option value="" selected disabled hidden>
              Please the Source
            </option>

            {Array.from({ length: distinctSource.length }).map((_, index) => (
              <option>{distinctSource[index]}</option>
            ))}
            <option></option>
          </select>

          <button
            type="submit"
            className="form--button--long--today"
            onClick={currentNewspaper}
          >
            Current Newspaper
          </button>
        </li>
      </ul>

      <table class="table table-hover">
        <tbody className="tbody--ideas">
          <tr>
            {Object.keys(Ideas[0]).map((ideaHeader) => (
              <th key={ideaHeader}>{ideaHeader}</th>
            ))}
          </tr>
          {filteredIdeas.map((idea) => (
            <tr>
              <td>
                <Button
                  variant="light"
                  as={Link}
                  to={"/ideas/ideaDetails/" + idea.Details}
                >
                  See more{"\uD83D\uDD0D"}
                </Button>
              </td>
              <td>{idea.Title}</td>
              <td>{idea.Section}</td>
              <td>{idea.Source}</td>
              <td>{idea.Potential}</td>
              <td>{idea.Expiration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

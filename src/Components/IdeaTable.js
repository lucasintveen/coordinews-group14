import { getIdeas } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function IdeaTable() {
  const [Ideas, setIdeas] = useState();
  const [search, setSearch] = useState("");
  const [section, setSection] = useState({});
  const [date, setDate] = useState();

  const searchOperator = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getIdeas().then((Ideas) => {
      const ideasMapped = Ideas.map((wrapper) => {
        console.log("wrapper: ", wrapper);
        const mappedIdeas = {
          Details: wrapper.id,
          Title: wrapper.attributes.title,
          Section: wrapper.attributes.section,
          Source: wrapper.attributes.source,
          Potential: wrapper.attributes.potential,
          Expiration: wrapper.attributes.expiration,
        };
        /** Add Article is not connected to database anymore .toString().slice(4, 15) */
        console.log("mappedIdeas: ", mappedIdeas);
        return mappedIdeas;
      });

      setIdeas(ideasMapped);
    });
  }, []);

  console.log("Idea: ", Ideas);

  if (!Ideas) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

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
  console.log("Check Type of Date: ", typeof date);
  console.log("Check Adjusted of Date: ", date);

  console.log("Set Date : ", date);

  const filteredIdeas = Object.values(Ideas).filter((idea) => {
    if (
      section.section === undefined &&
      section.Source === undefined &&
      date === undefined
    ) {
      return idea.Title.includes(search);
    } else if (section.Source === undefined && section.section === undefined) {
      return idea.Title.includes(search) && idea.Expiration.includes(date);
    } else if (section.section === undefined && date === undefined) {
      return (
        idea.Title.includes(search) && idea.Source.includes(section.Source)
      );
    } else if (section.Source === undefined && date === undefined) {
      return (
        idea.Title.includes(search) && idea.Section.includes(section.section)
      );
    } else if (section.section === undefined) {
      idea.Title.includes(search) &&
        idea.Source.includes(section.Source) &&
        idea.Expiration.includes(date);
    } else if (section.Source === undefined) {
      idea.Title.includes(search) &&
        idea.Section.includes(section.section) &&
        idea.Expiration.includes(date);
    } else if (
      section.section != undefined &&
      section.Source != undefined &&
      date != undefined
    ) {
      return (
        idea.Title.includes(search) &&
        idea.Section.includes(section.section) &&
        idea.Source.includes(section.Source) &&
        idea.Expiration.includes(date)
      );
    } else {
      return [];
    }
  });

  const rowLength = filteredIdeas.length;
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

  var distinctSection = Section.filter(onlyUnique);
  var distinctSource = Source.filter(onlyUnique);
  console.log("Distinct Source: ", distinctSource);
  var distinctPhotographer = Photographer.filter(onlyUnique);

  function handleSection(event) {
    setSection({
      [event.target.name]: event.target.value,
    });
  }

  // TODO: Adjust Dropdown for empty
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

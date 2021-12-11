import { getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Articletable() {
  const [Articles, setArticles] = useState();
  const [search, setSearch] = useState("");
  const [section, setSection] = useState({});
  const [date, setDate] = useState();

  const searchOperator = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getArticles().then((Articles) => {
      const articlesMapped = Articles.map((wrapper) => {
        const mappedArticle = {
          Details: wrapper.id,
          Title: wrapper.attributes.Title,
          Section: wrapper.attributes.Section,
          Journalist: wrapper.attributes.Journalist,
          Photographer: wrapper.attributes.Photographer,
          State: wrapper.attributes.State,
          Size: wrapper.attributes.Size,
          Deadline: wrapper.attributes.Deadline,
        };
        /** Add Article is not connected to database anymore .toString().slice(4, 15) */

        return mappedArticle;
      });

      setArticles(articlesMapped);
    });
  }, []);

  if (!Articles) {
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

  const filteredArticles = Object.values(Articles).filter((article) => {
    if (
      section.section === undefined &&
      section.journalist === undefined &&
      date === undefined
    ) {
      return article.Title.includes(search);
    } else if (
      section.journalist === undefined &&
      section.section === undefined
    ) {
      return article.Title.includes(search) && article.Deadline.includes(date);
    } else if (section.section === undefined && date === undefined) {
      return (
        article.Title.includes(search) &&
        article.Journalist.includes(section.journalist)
      );
    } else if (section.journalist === undefined && date === undefined) {
      return (
        article.Title.includes(search) &&
        article.Section.includes(section.section)
      );
    } else if (section.section === undefined) {
      article.Title.includes(search) &&
        article.Journalist.includes(section.journalist) &&
        article.Deadline.includes(date);
    } else if (section.journalist === undefined) {
      article.Title.includes(search) &&
        article.Section.includes(section.section) &&
        article.Deadline.includes(date);
    } else if (
      section.section != undefined &&
      section.journalist != undefined &&
      date != undefined
    ) {
      return (
        article.Title.includes(search) &&
        article.Section.includes(section.section) &&
        article.Journalist.includes(section.journalist) &&
        article.Deadline.includes(date)
      );
    } else {
      return [];
    }
  });

  const rowLength = filteredArticles.length;
  const rowLengthUnfiltered = Articles.length;

  const Section = [];
  const Journalist = [];
  const Photographer = [];

  for (let i = 0; i < rowLengthUnfiltered; i++) {
    Section.push(Articles[i].Section);
    Journalist.push(Articles[i].Journalist);
    Photographer.push(Articles[i].Photographer);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var distinctSection = Section.filter(onlyUnique);
  var distinctJournalist = Journalist.filter(onlyUnique);
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

            {Array.from({ length: rowLengthUnfiltered }).map((_, index) => (
              <option>{distinctSection[index]}</option>
            ))}
          </select>
          <select
            name="journalist"
            value={section.journalist}
            onChange={handleSection}
          >
            <option value="" selected disabled hidden>
              Please Select Here
            </option>

            {Array.from({ length: rowLengthUnfiltered }).map((_, index) => (
              <option>{distinctJournalist[index]}</option>
            ))}
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
        <thead>
          <br></br>
          <tr>
            {Object.keys(Articles[0]).map((articleHeader) => (
              <th key={articleHeader}>{articleHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr>
              {/* TODO: Ask for help on this one with TA's - My attempts with nested for loops and map functions broke */}
              <td as={Link} to="/Add_Article">
                {/* TODO: Link Reference */}
                {/* <Button variant="light" as={Link} to="/Add_Article">Add Article</Button> */}
                <Button
                  variant="light"
                  as={Link}
                  to={"/articles/articleDetails/" + article.Details}
                >
                  See more{"\uD83D\uDD0D"}
                </Button>
              </td>
              <td>{article.Title}</td>
              <td>{article.Section}</td>
              <td>{article.Journalist}</td>
              <td>{article.Photographer}</td>
              <td>{article.State}</td>
              <td>{article.Size}</td>
              <td>{article.Deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { getArticles, getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import articleSearch from "./ArticleSearch";

export default function Articletable() {
  const [Articles, setArticles] = useState();
  const [search, setSearch] = useState("");
  const [section, setSection] = useState({});
  const [date, setDate] = useState();
  var today = new Date();
  var dateToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const searchOperator = (event) => {
    setSearch(event.target.value);
  };
  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  useEffect(() => {
    getArticlesFromDb();
  }, []);

  if (!Articles) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  function currentNewspaper() {
    if (date === undefined) {
      setDate(dateToday);
    } else {
      setDate();
    }
  }

  const filteredArticles = articleSearch(Articles, search, section, date);
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
              Select the Section
            </option>

            {Array.from({ length: distinctSection.length }).map((index) => (
              <option>{distinctSection[index]}</option>
            ))}
            <option></option>
          </select>
          <select
            name="journalist"
            value={section.journalist}
            onChange={handleSection}
          >
            <option value="" selected disabled hidden>
              Select the Journalist
            </option>

            {Array.from({ length: distinctJournalist.length }).map(
              (_, index) => (
                <option>{distinctJournalist[index]}</option>
              )
            )}
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
        <tbody className="tbody--articles">
          <tr>
            {Object.keys(Articles[0])
              .slice(0, 7)
              .map((articleHeader) => (
                <th key={articleHeader}>{articleHeader}</th>
              ))}
          </tr>
          {filteredArticles.map((article) => (
            <tr>
              <td>
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
              <td>{article.State}</td>
              <td>{article.Deadline}</td>
              <td>{article.Completion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

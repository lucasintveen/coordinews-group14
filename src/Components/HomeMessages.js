import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import Popup from "./Popup";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

import { uploadArticle } from "../DatabaseInteraction/db";

export default function HomeMessages(props) {
  const [Articles, setArticles] = useState();

  useEffect(() => {
    getArticles().then((Articles) => {
      const articlesMapped = Articles.map((wrapper) => {
        const mappedArticle = {
          Details: wrapper.id,
          Title: wrapper.attributes.Title,
          Section: wrapper.attributes.Section,
          State: wrapper.attributes.State,
          Journalist: wrapper.attributes.Journalist,
          Photographer: wrapper.attributes.Photographer,
          Assistant: wrapper.attributes.State,
          Deadline: wrapper.attributes.Deadline,
          JournalistAcceptance: wrapper.attributes.JournalistAcc,
          PhotograpberAcceptance: wrapper.attributes.PhotoAcc,
          AssistantAcceptance: wrapper.attributes.AssiAcc,
        };

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

  const filteredArticles = Object.values(Articles).filter((article) => {
    if (Parse.User.current().attributes.Role === "Journalist") {
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.Role === "Photographer") {
      return article.Photographer.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.Role === "Assistant") {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.Role === "Editor") {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    }
  });
  const rowLength = filteredArticles.length;
  console.log("Landing Page: ", filteredArticles);
  const iterationCount = 0;

  return (
    <table class="table-messages table-hover">
      <thead>
        <br></br>
        <tr>
          {Object.keys(Articles[0])
            .slice(0, 4)
            .map((articleHeader) => (
              <th key={articleHeader} className="th-messages">
                {articleHeader}{" "}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="tbody-messages">
        {filteredArticles.map((article) => (
          <tr>
            <td as={Link} to="/Add_Article" className="td-messages">
              <Button
                variant="light"
                as={Link}
                to={"/articles/articleDetails/" + article.Details}
              >
                See more{"\uD83D\uDD0D"}
              </Button>
            </td>
            <td className="td-messages">{article.Title}</td>
            <td className="td-messages">{article.Section}</td>
            <td className="td-messages">{article.State}</td>
          </tr>
        ))}
      </tbody>
    </table>
    // <form className="form-mes">

    //   <div className="form-inputs-messages">
    //     <div className="form-inputs-messages1">
    //       <div className="form-inputs-messages">
    //         <label className="form-label">Title</label>
    //         <input
    //           className="form-input-mes"
    //           type="text"
    //           defaultValue={filteredArticles[0].Title}
    //         />
    //       </div>

    //       <div className="form-inputs-messages">
    //         <label className="form-label">Section</label>
    //         <input
    //           className="form-input-mes1"
    //           type="text"
    //           defaultValue={filteredArticles[0].Section}
    //         />
    //       </div>

    //       <div className="form-inputs-messages">
    //         <label className="form-label">State</label>
    //         <input
    //           className="form-input-mes1"
    //           type="text"
    //           defaultValue={filteredArticles[0].State}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   {filteredArticles.slice(1).map((article) => (
    //     <div className="form-inputs-messages">
    //       <div className="form-inputs-messages1">
    //         <div className="form-inputs-messages">
    //           <input
    //             className="form-input-mes"
    //             type="text"
    //             defaultValue={article.Title}
    //           />
    //         </div>

    //         <div className="form-inputs-messages">
    //           <input
    //             className="form-input-mes1"
    //             type="text"
    //             defaultValue={article.Section}
    //           />
    //         </div>

    //         <div className="form-inputs-messages">
    //           <input
    //             className="form-input-mes1"
    //             type="text"
    //             defaultValue={article.State}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </form>
  );
}

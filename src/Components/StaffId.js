import { getStaff } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../CSS/App.css";
import StaffIdTable from "./StaffIdTable";

export default function StaffID(props) {
  const [staff, setStaff] = useState();
  const { staffId } = useParams();
  useEffect(() => {
    async function getStaffFromDb() {
      const staff = await getStaff(staffId);
      setStaff(staff);
      props.passChildData([staffId]);
    }
    getStaffFromDb();
  }, []);

  if (!staff) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <div className="form-content-left">
        <img className="form-img-staff" src={staff.Image} alt="news icon" />
      </div>
      <div className="form-content-right">
        <form className="form1">
          <div className="form-inputs">
            <div className="form-inputs1">
              <div className="form-inputs">
                <label className="form-label">User Name</label>
                <input className="form-input1" defaultValue={staff.Title} />
              </div>

              <div className="form-inputs">
                <label className="form-label">Created At</label>
                <input className="form-input1" defaultValue={staff.Created} />
              </div>
            </div>
          </div>

          <div className="form-inputs">
            <div className="form-inputs1">
              <div className="form-inputs">
                <label className="form-label">Role</label>
                <input className="form-input1" defaultValue={staff.Role} />
              </div>

              <div className="form-inputs">
                <label className="form-label">Visibility Rights</label>
                <input
                  className="form-input1"
                  defaultValue={"Visibility to All & " + staff.Role + "-Rights"}
                />
              </div>
            </div>
          </div>
          <StaffIdTable username={staff.Title} />
        </form>
      </div>
    </>
  );
}

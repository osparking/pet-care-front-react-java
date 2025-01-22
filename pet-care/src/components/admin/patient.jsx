import React from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMsgAlerts();

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <main>
      <Table>
        <thread>
          <tr>
            <th>아이디</th>
            <th>성씨</th>
            <th>이름</th>
            <th>이메일</th>
            <th>휴대폰</th>
            <th>성별</th>
            <th>등록일</th>
            <th colSpan={2}>작업</th>
          </tr>
        </thread>
        <tbody>
          <tr>
            <td>{patient.id}</td>
            <td>{patient.lastName}</td>
            <td>{patient.firstName}</td>
            <td>{patient.email}</td>
            <td>{patient.mobile}</td>
            <td>{patient.gender}</td>
            <td>{patient.createdAt}</td>
            <td>
              <OverlayTrigger
                overlay={
                  <Tooltip id={`tooltip-view-${index}`}>팻 주인 열람</Tooltip>
                }
              >
                <Link
                  to={`/user_dashboard/${patient.id}/my_dashboard`}
                  className="text-info"
                >
                  <BsEyeFill />
                </Link>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    </main>
  );
};

export default Patient;

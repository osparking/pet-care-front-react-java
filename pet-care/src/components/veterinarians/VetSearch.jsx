import format from "date-fns";
import React from "react";
import { Form } from "react-bootstrap";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const VetSearch = ({ onSearchResult }) => {
  const [searchKey, setSearchKey] = useState({
    date: null,
    time: null,
    specialties: "",
  });

  const [showDateTime, setShowDateTime] = useState(false);
  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchKey({ ...searchKey, [name]: value });
  };

  const handleDateTimeToggle = (e) => {
    const ifChecked = e.target.checked;
    setShowDateTime(ifChecked);
    if (ifChecked) {
      setSearchKey({ ...searchKey, date: null, time: null });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // 수의사 검색 논리 구현
    let searchParams = { specialization: searchKey.specialties };
    if (searchKey.date) {
      const formattedDate = format(searchKey.date, "yyyy-MM-dd");
      searchParams.date = formattedDate;
    }
    if (searchKey.time) {
      const formattedTime = format(searchKey.time, "HH:mm");
      searchParams.time = formattedTime;
    }
    try {
      const response = await findAvailableVets(searchParams);
      onSearchResult(response.data);
      setShowErrorAlert(false);
    } catch (err) {
      setErrorMsg(err.message);
      setShowErrorAlert(true);
    }
  };

  const handleClearSearch = () => {
    setSearchKey({
      date: null,
      time: null,
      specialties: "",
    });
    setShowDateTime(false);
    onSearchResult([]);
  };

  return (
    <div>
      <h3>수의사 검색</h3>
      <Form>
        <Form.Group>
          <Form.Label>전문분야</Form.Label>
          <Form.Control
            as="select"
            name="specialties"
            value={searchKey.specialties}
            onChange={handleInputChange}
          >
            <option value="">- 전문분야 선택 -</option>
            <option value="surgeon">외과수술</option>
            <option value="urologist">비뇨기과</option>
            <option value="other">기타</option>
          </Form.Control>
        </Form.Group>

        <fieldset>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="가능한 날짜 및 시간 포함"
                  checked={showDateTime}
                  onChange={handleDateTimeFieldsToggle}
                />
              </Form.Group>
              {showDateTime && (
                <React.Fragment>
                  <legend>날짜 및 시간 포함</legend>
                  <Form.Group className="mb-3">
                    <Form.Label className="searchText">날짜</Form.Label>
                    <DatePicker
                      selected={searchKey.date}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      className="form-control"
                      placeholderText="날짜 선택"
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            </Col>
          </Row>
        </fieldset>
      </Form>
    </div>
  );
};

export default VetSearch;

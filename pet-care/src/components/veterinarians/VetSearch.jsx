import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { dateTimeFormatter } from "../utils//utilities";
import { findAvailableVets } from "./VetService";

const VetSearch = ({ onSearchResult }) => {
  const VET_SPEC_OTHER = "기타";
  const [searchKey, setSearchKey] = useState({
    date: null,
    time: null,
    specialization: "",
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

  const handleDateChange = (newDate) => {
    setFormData((prevState) => ({ ...prevState, date: newDate }));
  };

  const handleTimeChange = (newTime) => {
    setFormData((prevState) => ({ ...prevState, time: newTime }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // 수의사 검색 논리 구현
    const { date, time } = searchKey;
    const { formattedDate, formattedTime } = dateTimeFormatter(date, time);

    let searchParams = { specialization: searchKey.specialization };
    if (searchKey.date) {
      searchParams.date = formattedDate;
    }
    if (searchKey.time) {
      searchParams.time = formattedTime;
    }

    try {
      const response = await findAvailableVets(searchParams);
      onSearchResult(response.data);
      setShowErrorAlert(false);
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const handleClearSearch = () => {
    setSearchKey({
      date: null,
      time: null,
      specialization: "",
    });
    setShowDateTime(false);
    onSearchResult(null);
  };

  return (
    <section className="stickyFormContainer">
      <h3>수의사 검색</h3>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>전문분야</Form.Label>
          <Form.Control
            as="select"
            name="specialization"
            value={searchKey.specialization}
            onChange={handleInputChange}
          >
            <option value="">- 전문분야 선택 -</option>
            <option value="애견치과">애견치과</option>
            <option value="애견비뇨">애견비뇨</option>
            <option value="이비인후">이비인후</option>
            <option value={VET_SPEC_OTHER}>{VET_SPEC_OTHER}</option>
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
                  onChange={handleDateTimeToggle}
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
                  <Form.Group className="mb-3">
                    <Form.Label className="searchText">시간</Form.Label>
                    <DatePicker
                      selected={searchKey.time}
                      onChange={handleTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      dateFormat="HH:mm"
                      className="form-control"
                      placeholderText="시간 선택"
                      required
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            </Col>
          </Row>
        </fieldset>
        <div className="d-flex justify-content-center mb-4">
          <Button type="submit" variant="outline-primary">
            검색
          </Button>
          <div className="mx-2">
            <Button
              type="button"
              variant="outline-info"
              onClick={handleClearSearch}
            >
              조건 지우기
            </Button>
          </div>
        </div>
      </Form>
      <div>
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      </div>
    </section>
  );
};

export default VetSearch;

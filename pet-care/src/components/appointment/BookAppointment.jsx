import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import PetEntry from "../Pet/PetEntry";
import { dateTimeFormatter } from "../utils//utilities";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    pets: [
      {
        name: "",
        type: "",
        color: "",
        breed: "",
        age: "",
      },
    ],
  });

  const { recipientId } = useParams();

  const dateChanged = (newDate) => {
    setFormData((prevState) => ({ ...prevState, date: newDate }));
  };

  const timeChanged = (newTime) => {
    setFormData((prevState) => ({ ...prevState, time: newTime }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

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

  /**
   * 이 코드는 강사와 다르다. 그러나 index 로 바로 접근하니 보다 효율적일 것임.
   * 동영상 코드는 21:37초에 표시됨.
   */
  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    const newPets = [...formData.pets];
    newPets[index][name] = value;
    setFormData((prevState) => ({ ...prevState, pets: newPets }));
  };

  const addPet = () => {
    const newPet = {
      name: "",
      type: "",
      color: "",
      breed: "",
      age: "",
    };
    setFormData((prevState) => ({
      ...prevState,
      pets: [...prevState.pets, newPet],
    }));
  };

  const removePet = (index, e) => {
    const newPets = [...formData.pets];
    newPets.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, pets: newPets }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = formData;
    const { formattedDate, formattedTime } = dateTimeFormatter(date, time);

    const pets = formData.pets.map((pet) => ({
      name: pet.name,
      type: pet.type,
      color: pet.color,
      breed: pet.breed,
      age: pet.age,
    }));

    const request = {
      appointment: {
        date: formattedDate,
        time: formattedTime,
        reason: formData.reason,
      },
      pets: pets,
    };

    try {
      const response = await bookAppointment(senderId, recipientId, request);
      setSuccessMsg(response.data.message);
      setShowSuccessAlert(true);
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setShowErrorAlert(true);
    }

    const handleReset = () => {
      setFormData({
        date: "",
        time: "",
        reason: "",
        pets: [
          {
            name: "",
            type: "",
            color: "",
            breed: "",
            age: "",
          },
        ],
      });
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
    };
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6} md={10} sm={12}>
          <Form onSubmit={handleSubmit}>
            <Card className="shadow mb-5">
              <Card.Header as="h5" className="text-center">
                진료 예약 폼
              </Card.Header>
              <Card.Body>
                <fieldset className="field-set mb-4">
                  <legend as="h5" className="text-center">
                    예약 날짜, 시간
                  </legend>
                  <Form.Group as={Row} className="mb-4">
                    <Col md={6}>
                      <DatePicker
                        selected={formData.date}
                        onChange={dateChanged}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        className="form-control"
                        placeholderText="날짜 선택"
                        required
                      />
                    </Col>
                    <Col sm={6}>
                      <DatePicker
                        selected={formData.time}
                        onChange={timeChanged}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        minDate={new Date()}
                        className="form-control"
                        placeholderText="시간 선택"
                        required
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group className="mb-4">
                  <Form.Label>예약 사유</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="reason"
                    onChange={handleInputChange}
                    value={formData.reason}
                    required
                  />
                </Form.Group>
                <h5 className="text-center">진료 대상 애완 동물</h5>
                {formData.pets.map((pet, index) => (
                  <PetEntry
                    key={index}
                    pet={pet}
                    index={index}
                    handleInputChange={(e) => handlePetChange(index, e)}
                    removePet={removePet}
                    canRemove={formData.pets.length > 1}
                  />
                ))}
                <div className="d-flex justify-content-center mb-3">
                  <OverlayTrigger overlay={<Tooltip>팻 추가</Tooltip>}>
                    <Button size="sm" onClick={addPet} className="me-2">
                      <FaPlus />
                    </Button>
                  </OverlayTrigger>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    예약
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleReset}
                  >
                    리셋
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment;

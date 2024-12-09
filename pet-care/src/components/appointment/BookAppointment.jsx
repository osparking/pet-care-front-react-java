import React from "react";

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

  const dateChanged = (newDate) => {
    setFormData((prevState) => ({ ...prevState, date: newDate }));
  };

  const timeChanged = (newTime) => {
    setFormData((prevState) => ({ ...prevState, time: newTime }));
  };

  return <div>BookAppointment</div>;
};

export default BookAppointment;

import React from "react";

const ApmtUpdateModal = ({ show, apmt, doClose, doUpdate }) => {
  const [apmtDate, setApmtDate] = useState(new Date(apmt.date));
  const [apmtTime, setApmtTime] = useState(
    new Date(`${apmt.date}T${apmt.time}`)
  );
  const [reason, setReason] = useState(apmt.reason);

  const handleSubmit = () => {
    const updatedApmt = {
      ...apmt,
      date: apmtDate.toISOString().split("T")[0],
      time: apmtTime.toTimeString().split(" ")[0].substring(0, 5),
      reason,
    };
    doUpdate(updatedApmt);
  };

  return <div>ApmtUpdateModal</div>;
};

export default ApmtUpdateModal;

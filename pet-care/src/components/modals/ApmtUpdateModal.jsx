import React from "react";

const ApmtUpdateModal = ({ show, apmt, doClose, doUpdate }) => {
  const [apmtDate, setApmtDate] = useState(new Date(apmt.date));
  const [apmtTime, setApmtTime] = useState(
    new Date(`${apmt.date}T${apmt.time}`)
  );

  return <div>ApmtUpdateModal</div>;
};

export default ApmtUpdateModal;

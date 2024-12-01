import React from "react";

const VetSearch = () => {
  const [searchKey, setSearchKey] = useState({
    date: null,
    time: null,
    specialties: "",
  });

  const [showDateTime, setShowDateTime] = useState(false);

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

  return <div></div>;
};

export default VetSearch;

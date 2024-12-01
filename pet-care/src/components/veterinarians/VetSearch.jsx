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
    setSearchKey({...searchKey, [name]: value });
  };

  
  return <div></div>;
};

export default VetSearch;

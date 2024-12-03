import format from "date-fns";
import React from "react";
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
    } catch (err) {}
  };

  return <div></div>;
};

export default VetSearch;

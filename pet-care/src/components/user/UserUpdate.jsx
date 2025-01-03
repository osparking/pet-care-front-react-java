import React from "react";

const UserUpdate = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    mobile: "",
    specialization: "",
    email: "",
    userType: "",
  });
  return <div>UserUpdate</div>;
};

export default UserUpdate;
